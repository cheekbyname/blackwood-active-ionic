// Angular/Ionic
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

// Services
import { CareActivityService } from '../../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../../models/careinitialassessment';
import { CareContact } from '../../../models/contact';

// Components
import { CareContactModal } from '../../../components/carecontact.modal/carecontact.modal';

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

	constructor(public navCtrl: NavController, public params: NavParams, public actSrv: CareActivityService,
		public modCtrl: ModalController, private fb: FormBuilder) {
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

	addContact() {
		var newContact = new CareContact();
		this.assess.contacts.push(newContact);
		var contactArray = this.form.controls['contacts'] as FormArray;
		contactArray.push(this.fb.group(CareContact.Controls(newContact)));
		this.openContact(newContact, this.assess.contacts.length - 1);
	}

	openContact(contact: CareContact, idx: number) {
		var contactArray = this.form.controls['contacts'] as FormArray;
		var ctrls = contactArray.controls[idx] as FormGroup;
		var mod = this.modCtrl.create(CareContactModal, { contact: contact, form: ctrls });
		mod.present();
	}
}
