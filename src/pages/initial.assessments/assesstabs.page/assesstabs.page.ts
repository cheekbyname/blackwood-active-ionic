// Angular/Ionic
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { NavController, AlertController, Content, ToastController } from 'ionic-angular';

// Models
import { CareInitialAssessment } from "../../../models/careinitialassessment";

// Components
import { AssessCheckPage } from '../../initial.assessments/assesscheck.page/assesscheck.page';
import { CleverCogsAssessPage } from '../clevercogs.assess.page/clevercogs.assess.page';
import { HandlingPage } from '../../initial.assessments/handling.page/handling.page';
import { InitialAssessPage } from '../../initial.assessments/initialassess.page/initialassess.page';
import { TilePage } from '../../initial.assessments/tile.page/tile.page';

// Services
import { CareActivityService } from '../../../services/care.activity.service';
import { CareContact } from '../../../models/contact';

@Component({
	templateUrl: 'assesstabs.page.html'
})
export class AssessTabsPage implements AfterViewInit {
	@ViewChild(Content) content: Content;

	tabs: Tab[] = [
		new Tab("Assessment", InitialAssessPage),
		new Tab("CleverCogs", CleverCogsAssessPage),
		new Tab("Checklist", AssessCheckPage),
		new Tab("Handling", HandlingPage),
		new Tab("T.I.L.E", TilePage)
	];

	showAlert: boolean = true;
	assess: CareInitialAssessment;
	savedAssess: any;
	form: FormGroup;

	constructor(private navCtrl: NavController, public actSrv: CareActivityService, public alertCtrl: AlertController,
		public fb: FormBuilder, public element: ElementRef, public toast: ToastController) {
		this.assess = this.actSrv.getCurrentCareInitialAssessment();

		// Build form from object literal for statically generated FormControls
		this.form = this.fb.group(this.getFormControls());

		// Build FormArray for Contacts
		this.form.addControl("contacts", this.fb.array([]));
		var contactArray = this.form.get('contacts') as FormArray;
		this.assess.contacts.forEach(c => {
			contactArray.push(this.fb.group(CareContact.Controls(c)));
		});

		// Init iteratively generated FormControls
		this.assess.comms.forEach((com, idx) => {
			this.form.addControl(`commspref_${idx}`, new FormControl());
		});

		this.assess.cleverCogsReasons.forEach((reason, idx) => {
			this.form.addControl(`reason_${idx}`, new FormControl());
		});

		this.assess.cleverCogsFeatures.forEach((feature, idx) => {
			this.form.addControl(`feature_${idx}`, new FormControl());
		});

		this.assess.currentlyHasDevices.forEach((device, idx) => {
			this.form.addControl(`hasDevice_${idx}`, new FormControl());
		});

		this.assess.planningToGetDevices.forEach((device, idx) => {
			this.form.addControl(`getDevice_${idx}`, new FormControl());
		});

		this.assess.trainingAvailability.forEach((day, idx) => {
			this.form.addControl(`trainAvail_${idx}`, new FormControl());
		});

		this.assess.checkItems.forEach((item, idx) => {
			let itemName = `checkItem_${idx}`;
			this.form.addControl(itemName, new FormControl(item.value));
			this.form.addControl(itemName + '_further', new FormControl(item.further));
		});

		this.assess.tileGroups.forEach((group, idx) => {
			group.items.forEach((item, iid) => {
				let postFix = `_${idx}_${iid}`;
				this.form.addControl('tileHazard' + postFix, new FormControl(item.hazard));
				this.form.addControl('tileAction' + postFix, new FormControl(item.remedialAction));
			});
		});
	}

	ngAfterViewInit() {
		this.savedAssess = this.form.value;
	}

	ionViewCanLeave() {
		if (this.showAlert && this.form.dirty) {
			let confirmLeave = this.alertCtrl.create({
				cssClass: 'customAlert',
				title: 'Unsaved Changes',
				message: 'You have unsaved changes on this form. Would you like to:<br/><ul>'
				+ '<li><strong>Cancel</strong> and return to the form</li>'
				+ '<li><strong>Discard</strong> your changes and leave the form</li>'
				+ '<li><strong>Save</strong> your changes and leave the form</li></ul>',
				buttons: [
					{ text: 'Cancel', handler: () => true },
					{
						text: 'Discard', handler: () => {
							this.resetForm();
							confirmLeave.dismiss().then(() => {
								this.showAlert = false;
								this.navCtrl.pop();
							});
						}
					},
					{
						text: 'Save', handler: () => {
							confirmLeave.dismiss().then(() => {
								this.showAlert = false;
								this.saveAssessment().then(ok => {
									if (ok) {
										this.navCtrl.pop()
									}
								});
							});
						}
					}
				]
			});
			confirmLeave.present();
			return false;
		}
		//this.actSrv.saveCareInitialAssessment(this.actSrv.getCurrentCareInitialAssessment());
	}

	saveAssessment(): Promise<boolean> {
		if (this.form.valid) {
			let confirmSave = this.alertCtrl.create({
				title: 'Save Changes?',
				message: 'Are you sure you want to save the changes to this Initial Assessment?',
				buttons: [
					{ text: 'No' },
					{
						text: 'Yes', handler: () => {
							this.actSrv.saveCareInitialAssessment(this.actSrv.currentCareInitialAssessment)
								.then(res => {
									this.toast.create(
										{ message: 'Changes to Care Initial Assessment saved to server', duration: 3000 }
									).present();
								})
								.catch(err => {
									var errAlert = this.alertCtrl.create({
										title: "Unable to Save to Server",
										message: "Could not save your form to the server, there may be a network or other connectivity problem. "
											+ "This form has been saved locally to your device. Please remember to save your form again once you are connected to Blackwood's "
											+ "network. If you have any questions, please contact Business Solutions.",
										buttons: [{ text: "Ok", handler: () => { }}]
									});
									errAlert.present();
								});
							this.savedAssess = this.form.value;
							this.form.markAsPristine();
						}
					}
				]
			});
			confirmSave.present();
			return Promise.resolve(true);
		} else {
			let alertInvalid = this.alertCtrl.create({
				title: 'Missing or Invalid Data',
				message: 'Some data on the form is either missing or invalid. Please check the form and try again.',
				buttons: [{ text: 'Ok' }]
			});
			alertInvalid.present();
			return Promise.resolve(false);
		}
	}

	resetForm() {
		this.form.reset(this.savedAssess);
	}

	getFormControls() {
		return {
			// Assessment Tab
			visitDate: [new Date(this.assess.visitDate).toISOString(), Validators.required],
			visitBy: [this.assess.visitBy, Validators.required],
			name: [this.assess.name, Validators.required],
			prefName: [this.assess.prefName],
			address1: [this.assess.address1, Validators.required],
			telephoneNumber: [this.assess.telephoneNumber],
			dateOfBirth: [new Date(this.assess.dateOfBirth).toISOString(), Validators.required],
			visitType: [this.assess.visitType, Validators.required],
			livesAlone: [this.assess.livesAlone],
			hasCareOrSupport: [this.assess.hasCareOrSupport],
			blackwoodHours: [this.assess.blackwoodHours],
			otherCare: [this.assess.otherCare],
			hasOtherProvider: [this.assess.hasOtherProvider],
			otherProviderHours: [this.assess.otherProviderHours],
			whatRequired: [this.assess.whatRequired, Validators.required],
			whenRequired: [this.assess.whenRequired, Validators.required],
			bedUpTime: [this.assess.bedUpTime],
			bedDownTime: [this.assess.bedDownTime],
			sleepPattern: [this.assess.sleepPattern],
			staffRequirements: [this.assess.staffRequirements],
			overallHealth: [this.assess.overallHealth],
			generalHealth: [this.assess.generalHealth],
			disabilityVisual: [this.assess.disabilityVisual],
			disabilityHearing: [this.assess.disabilityHearing],
			disabilityCognitiveLifelong: [this.assess.disabilityCognitiveLifelong],
			disabilityPhysicalLifelong: [this.assess.disabilityPhysicalLifelong],
			disabilityCognitiveAgeRelated: [this.assess.disabilityCognitiveAgeRelated],
			disabilityPhysicalAgeRelated: [this.assess.disabilityPhysicalAgeRelated],
			disabilityChronicIllness: [this.assess.disabilityChronicIllness],
			disabilityOther: [this.assess.disabilityOther],
			disabilityOtherDetails: [this.assess.disabilityOtherDetails],
			timesFallen: [this.assess.timesFallen],
			fallenHospital: [this.assess.fallenHospital],
			personalPoorExercise: [this.assess.personalPoorExercise],
			personalHygiene: [this.assess.personalHygiene],
			personalNutrition: [this.assess.personalNutrition],
			personalColdTolerance: [this.assess.personalColdTolerance],
			personalHydration: [this.assess.personalHydration],
			medication: [this.assess.medication],
			medicationCapacity: [this.assess.medicationCapacity],
			medicMorningVisit: [this.assess.medicMorningVisit],
			medicLunchVisit: [this.assess.medicLunchVisit],
			medicTeatimeVisit: [this.assess.medicTeatimeVisit],
			medicBedtimeVisit: [this.assess.medicBedtimeVisit],
			medicOtherVisit: [this.assess.medicOtherVisit],
			medicOtherVisitDetails: [this.assess.medicOtherVisitDetails],
			medicOralGrading: [this.assess.medicOralGrading],
			medicNonOralGrading: [this.assess.medicNonOralGrading],
			whoOrdersMedication: [this.assess.whoOrdersMedication],
			forgetsMedication: [this.assess.forgetsMedication],
			familyCarer: [this.assess.familyCarer],
			eyeSight: [this.assess.eyeSight],
			hearing: [this.assess.hearing],
			communicationAbility: [this.assess.communicationAbility],
			continence: [this.assess.continence],
			continenceDetails: [this.assess.continenceDetails],
			dexterity: [this.assess.dexterity],
			adaptations: [this.assess.adaptations],
			mentalHealth: [this.assess.mentalHealth],
			dietaryRequirements: [this.assess.dietaryRequirements],
			foodDrinkPreferences: [this.assess.foodDrinkPreferences],
			socialInterests: [this.assess.socialInterests],
			religionCulture: [this.assess.religionCulture],
			happyVary: [this.assess.happyVary],
			timeChange: [this.assess.timeChange],
			genderPref: [this.assess.genderPref],
			genderDetails: [this.assess.genderDetails],
			altGender: [this.assess.altGender],
			accessArrangements: [this.assess.accessArrangements],
			doorEntry: [this.assess.doorEntry],
			keyCode: [this.assess.keyCode],
			disability: [this.assess.disability],
			allergies: [this.assess.allergies],
			gpDetails: [this.assess.gpDetails],
			otherProvider: [this.assess.otherProvider],
			nextOfKin: [this.assess.nextOfKin],
			specificRisks: [this.assess.specificRisks],
			goals: [this.assess.goals],
			additionalInfo: [this.assess.additionalInfo],
			issueIntruders: [this.assess.issueIntruders],
			issueBogusCalls: [this.assess.issueBogusCalls],
			issueGoingOut: [this.assess.issueGoingOut],
			issueScalds: [this.assess.issueScalds],
			issueCooker: [this.assess.issueCooker],
			issueFlooding: [this.assess.issueFlooding],
			issueOpenDoors: [this.assess.issueOpenDoors],
		
			// CleverCogs Tab
			videoCameraConsent: [this.assess.videoCameraConsent],
			videoCameraConsentComments: [this.assess.videoCameraConsentComments],
			videoCareConsent: [this.assess.videoCareConsent],
			videoCareConsentComments: [this.assess.videoCareConsentComments],
			videoCameraLocation: [this.assess.videoCameraLocation],
			socialWorkReferral: [this.assess.socialWorkReferral],
			socialWorkReferralWho: [this.assess.socialWorkReferralWho],
			socialWorkReferralWhen: [this.assess.socialWorkReferralWhen],
			fallDetector: [this.assess.fallDetector],
			safetyAlarm: [this.assess.safetyAlarm],
			landlineSupplier: [this.assess.landlineSupplier],
			hasExistingBroadband: [this.assess.hasExistingBroadband],
			existingBroadbandSupplier: [this.assess.existingBroadbandSupplier],
			cleverCogsOtherReason: [this.assess.cleverCogsOtherReason],
			cleverCogsOtherFeature: [this.assess.cleverCogsOtherFeature],
			internetUsage: [this.assess.internetUsage],
			internetUsageFrequency: [this.assess.internetUsageFrequency],
			internetUsageAbility: [this.assess.internetUsageAbility],
			trainingSupport: [this.assess.trainingSupport],
			spendingTime: [this.assess.spendingTime],
			customLeisureActivity: [this.assess.customLeisureActivity],
			customEntertainment: [this.assess.customEntertainment],
			customSocialising: [this.assess.customSocialising],
			customHobbies: [this.assess.customHobbies],
			customWork: [this.assess.customWork],
			customCaringOthers: [this.assess.customCaringOthers],

			// Checklist Tab
			otherHazards: [this.assess.otherHazards],
			furtherAction: [this.assess.furtherAction],
			fullAssessReqd: [this.assess.fullAssessReqd],

			// Handling Tab
			aboutPerson: [this.assess.aboutPerson],
			bodyBuildWeight: [this.assess.bodyBuildWeight],
			bodyBuildHeight: [this.assess.bodyBuildHeight],
			riskFalls: [this.assess.riskFalls],
			problems: [this.assess.problems],
			constraints: [this.assess.constraints],
			transferSpec: [this.assess.transferSpec],
			transferPeople: [this.assess.transferPeople],
			transferWalkingAid: [this.assess.transferWalkingAid],
			transferAdditional: [this.assess.transferAdditional],
			toiletSpec: [this.assess.toiletSpec],
			toiletPeople: [this.assess.tolietPeople],
			toiletWalkingAid: [this.assess.toiletWalkingAid],
			toiletAdditional: [this.assess.toiletAdditional],
			bedpanSpec: [this.assess.bedpanSpec],
			bedpanManeuver: [this.assess.bedpanManeuver],
			bedpanPeople: [this.assess.bedpanPeople],
			bedpanAdditional: [this.assess.bedpanAdditional],
			bedMoveSpec: [this.assess.bedMoveSpec],
			bedMoveHandlingAid: [this.assess.bedMoveHandlingAid],
			bedMovePeople: [this.assess.bedMovePeople],
			bedMoveAdditional: [this.assess.bedMoveAdditional],
			bedTransferSpec: [this.assess.bedTransferSpec],
			bedTransferHandlingAid: [this.assess.bedTransferHandlingAid],
			bedTransferPeople: [this.assess.bedTransferPeople],
			bedTransferAdditional: [this.assess.bedTransferAdditional],
			bedsideSpec: [this.assess.bedsideSpec],
			bedsidePeople: [this.assess.bedsidePeople],
			bedsideAdditional: [this.assess.bedsideAdditional],
			bathShowerWhich: [this.assess.bathShowerWhich],
			bathShowerHandlingAid: [this.assess.bathShowerHandlingAid],
			bathShowerSpec: [this.assess.bathShowerSpec],
			bathShowerPeople: [this.assess.bathShowerPeople],
			bathShowerAdditional: [this.assess.bathShowerAdditional],
			walkingSpec: [this.assess.walkingSpec],
			walkingWalkingAid: [this.assess.walkingWalkingAid],
			walkingPeople: [this.assess.walkingPeople],
			walkingAdditional: [this.assess.walkingAdditional],
			otherInstructions: [this.assess.otherInstructions],

			// Tile Tab
			overallRisk: [this.assess.overallRisk]
		}
	}
}

class Tab {
	title: string;
	page: any;

	constructor(title: string, page: any) {
		this.title = title;
		this.page = page;
	}
}