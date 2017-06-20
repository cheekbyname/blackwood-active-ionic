// Angular/Ionic
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'initialassess.page.html'
})
export class InitialAssessPage {

	isDrawing = false;

	@ViewChild(SignaturePad) signaturePad: SignaturePad;

	private signaturePadOptions: Object = {
		'minWidth': 2,
		'canvasWidth': 750,
		'canvasHeight': 200,
		'backgroundColor': '#E1E1E1',
		'penColor': '#666a73'
	};

	constructor(public navCtrl: NavController, public actSrv: CareActivityService) {
		
	}

	assess: CareInitialAssessment = new CareInitialAssessment();

	ionViewWillEnter() {
		this.assess = this.actSrv.getCurrentCareInitialAssessment();
		this.signaturePad.fromDataURL(this.assess.signature);
		console.log(this.actSrv.getCurrentCareInitialAssessment());
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
