// Angular/Ionic
import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NavController, AlertController } from 'ionic-angular';

// Models
import { CareInitialAssessment } from "../../models/careinitialassessment";

// Components
import { InitialAssessPage } from '../../pages/initialassess.page/initialassess.page';
import { AssessCheckPage } from '../../pages/assesscheck.page/assesscheck.page';
import { HandlingPage } from '../../pages/handling.page/handling.page';
import { TilePage } from '../../pages/tile.page/tile.page';

// Services
import { CareActivityService } from '../../services/care.activity.service';

@Component({
	templateUrl: 'assesstabs.page.html'
})
export class AssessTabsPage implements AfterViewInit {

	tabs: Tab[] = [
		new Tab("Assessment", InitialAssessPage),
		new Tab("Checklist", AssessCheckPage),
		new Tab("Handling", HandlingPage),
		new Tab("T.I.L.E", TilePage)
	];

	showAlert: boolean = true;
	assess: CareInitialAssessment;
	savedAssess: any;
	form: FormGroup;

	constructor(private navCtrl: NavController, public actSrv: CareActivityService, public alertCtrl: AlertController,
		public formBuilder: FormBuilder, public element: ElementRef) {
		this.assess = this.actSrv.getCurrentCareInitialAssessment();

		// Build form from object literal for statically generated FormControls
		this.form = this.formBuilder.group(this.getFormControls());

		// Init iteratively generated FormControls
		this.assess.comms.forEach(com => {
			this.form.addControl('commspref_' + this.assess.comms.indexOf(com), new FormControl());
		});

		this.assess.checkItems.forEach(item => {
			let itemName = 'checkItem_' + this.assess.checkItems.indexOf(item);
			this.form.addControl(itemName, new FormControl(item.value));
			this.form.addControl(itemName + '_further', new FormControl(item.further));
		});

		this.assess.tileGroups.forEach(group => {
			group.items.forEach(item => {
				let postFix = '_' + this.assess.tileGroups.indexOf(group) + '_' + group.items.indexOf(item);
				this.form.addControl('tileHazard' + postFix, new FormControl(item.hazard));
				this.form.addControl('tileAction' + postFix, new FormControl(item.remedialAction));
			});
		});
	}

	ngAfterViewInit() {
		this.savedAssess = this.form.value;
		console.log(this.savedAssess);
	}

	ionViewCanLeave() {
		if (this.showAlert && this.form.dirty) {
			let confirmLeave = this.alertCtrl.create({
				cssClass: 'customAlert',
				title: 'Unsaved Changes',
				message: 'You have unsaved changes! Are you sure you want to leave this Assessment?',
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
							this.saveAssessment();
							confirmLeave.dismiss().then(() => {
								this.showAlert = false;
								this.navCtrl.pop();
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

	saveAssessment() {
		if (this.form.valid) {
			let confirmSave = this.alertCtrl.create({
				title: 'Save Changes?',
				message: 'Are you sure you want to save the changes to this Initial Assessment?',
				buttons: [
					{ text: 'No' },
					{
						text: 'Yes', handler: () => {
							this.actSrv.saveCareInitialAssessment(this.actSrv.currentCareInitialAssessment);
							this.savedAssess = this.form.value;
							this.form.markAsPristine();
						}
					}
				]
			});
			confirmSave.present();
		} else {
			let alertInvalid = this.alertCtrl.create({
				title: 'Missing or Invalid Data',
				message: 'Some data on the form is either missing or invalid. Please check the form and try again.',
				buttons: [{ text: 'Ok'}]
			});
			alertInvalid.present()
				.then(x => {
					var invalid = this.element.nativeElement.querySelectorAll('.ng-invalid');
					invalid[2].scrollIntoView();
					// TODO Select only valid input elements and scroll slightly further up to ensure labels etc. on view
				});
		}
	}

	resetForm() {
		console.log(this.savedAssess);
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
			whatRequired: [this.assess.whatRequired, Validators.required],
			whenRequired: [this.assess.whenRequired, Validators.required],
			staffRequirements: [this.assess.staffRequirements],
			generalHealth: [this.assess.generalHealth],
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