// Angular/Ionic
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

// Services
import { CareActivityService } from '../../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../../models/careinitialassessment';

@Component({
	templateUrl: 'initialassess.page.html'
})
export class InitialAssessPage {

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

	ionViewWillEnter() {
		if (this.assess.signature != null) this.signaturePad.fromDataURL(this.assess.signature);
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