// Angular/Ionic
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'initialassess.page.html'
})
export class InitialAssessPage implements OnInit {

	@ViewChild(SignaturePad) signaturePad: SignaturePad;
	
	private signaturePadOptions: Object = {
		'minWidth': 2,
		'canvasWidth': 750,
		'canvasHeight': 200,
		'backgroundColor': '#E1E1E1',
		'penColor': '#666a73'
	};

	isDrawing = false;
	assess: CareInitialAssessment = new CareInitialAssessment();
	form: FormGroup;

	constructor(public navCtrl: NavController, public params: NavParams, public actSrv: CareActivityService) {
		this.assess = this.params.get("assess");
		this.form = this.params.get("form");
	}

	ngOnInit() {
		this.form.addControl('visitDate', new FormControl(this.assess.visitDate, Validators.required));
		this.form.addControl('visitBy', new FormControl(Validators.required));
		this.form.addControl('name', new FormControl(Validators.required));
		this.form.addControl('prefName', new FormControl());
		this.form.addControl('address1', new FormControl(Validators.required));
		this.form.addControl('telephoneNumber', new FormControl());
		this.form.addControl('dateOfBirth', new FormControl(this.assess.dateOfBirth, Validators.required));
		this.form.addControl('visitType', new FormControl(Validators.required));
		this.form.addControl('whatRequired', new FormControl(Validators.required));
		this.form.addControl('whenRequired', new FormControl(Validators.required));
		this.form.addControl('staffRequirements', new FormControl());
		this.form.addControl('generalHealth', new FormControl());
		this.form.addControl('medication', new FormControl());
		this.form.addControl('medicationCapacity', new FormControl());
		this.form.addControl('medicMorningVisit', new FormControl());
		this.form.addControl('medicLunchVisit', new FormControl());
		this.form.addControl('medicTeatimeVisit', new FormControl());
		this.form.addControl('medicBedtimeVisit', new FormControl());
		this.form.addControl('medicOtherVisit', new FormControl());
		this.form.addControl('medicOtherVisitDetails', new FormControl());
		this.form.addControl('medicOralGrading', new FormControl());
		this.form.addControl('medicNonOralGrading', new FormControl());
		this.form.addControl('whoOrdersMedication', new FormControl());
		this.form.addControl('familyCarer', new FormControl());
		this.form.addControl('eyeSight', new FormControl());
		this.form.addControl('hearing', new FormControl());
		this.form.addControl('communicationAbility', new FormControl());
		this.assess.comms.forEach(com => {
			this.form.addControl('commspref_' + this.assess.comms.indexOf(com), new FormControl());
		});
		this.form.addControl('continence', new FormControl());
		this.form.addControl('continenceDetails', new FormControl());
		this.form.addControl('dexterity', new FormControl());
		this.form.addControl('adaptations', new FormControl());
		this.form.addControl('mentalHealth', new FormControl());
		this.form.addControl('dietaryRequirements', new FormControl());
		this.form.addControl('foodDrinkPreferences', new FormControl());
		this.form.addControl('socialInterests', new FormControl());
		this.form.addControl('religionCulture', new FormControl());
		this.form.addControl('happyVary', new FormControl());
		this.form.addControl('timeChange', new FormControl());
		this.form.addControl('genderPref', new FormControl());
		this.form.addControl('genderDetails', new FormControl());
		this.form.addControl('altGender', new FormControl());
		this.form.addControl('accessArrangements', new FormControl());
		this.form.addControl('doorEntry', new FormControl());
		this.form.addControl('keyCode', new FormControl());
		this.form.addControl('disability', new FormControl());
		this.form.addControl('allergies', new FormControl());
		this.form.addControl('gpDetails', new FormControl());
		this.form.addControl('otherProvider', new FormControl());
		this.form.addControl('nextOfKin', new FormControl());
		this.form.addControl('specificRisks', new FormControl());
		this.form.addControl('goals', new FormControl());
		this.form.addControl('additionalInfo', new FormControl());
	}

	ionViewWillEnter() {
		this.signaturePad.fromDataURL(this.assess.signature);
		//this.assess = this.actSrv.getCurrentCareInitialAssessment();
		//console.log(this.actSrv.getCurrentCareInitialAssessment());
	}

	drawComplete() {
		this.isDrawing = false;
	}

	drawStart() {
		this.isDrawing = true;
	}

	clearPad() {
		this.signaturePad.clear();
	}
	savePad() {
		this.assess.signature = this.signaturePad.toDataURL();
	}
}
