// Angular/Ionic
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { NavController, NavParams, ModalController, Platform, DateTime } from 'ionic-angular';
import { DatePicker } from 'ionic-native';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

// Services
import { CareActivityService } from '../../../services/care.activity.service';

// Models
import { CareInitialAssessment, RATINGS, Ratings, FORGETS_MEDIC } from '../../../models/careinitialassessment';
import { CareContact } from '../../../models/contact';

// Components
import { CareContactModal } from '../../../components/carecontact.modal/carecontact.modal';

@Component({
	templateUrl: 'initialassess.page.html'
})
export class InitialAssessPage {

	@ViewChild(DateTime) bedUpTime: DateTime;
	@ViewChild(DateTime) bedDownTime: DateTime;
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
	ratings = RATINGS.filter(r => r.key !== Ratings.NoneSelected);
	forgetsMedic = FORGETS_MEDIC;

	constructor(public navCtrl: NavController, public params: NavParams, public actSrv: CareActivityService,
		public modCtrl: ModalController, private fb: FormBuilder, private platform: Platform) {
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
		mod.onDidDismiss(data => {
			// Remove model and controls if Contact removed
			if (data.remove === true) {
				contactArray.removeAt(idx);
				this.assess.contacts.splice(idx, 1);
			}
		});
		mod.present();
	}

	// TODO Remove
	showUpTime(ev: any) {
		if (this.platform.is('cordova')) {
			DatePicker.show({ date: this.assess.bedUpTime, mode: 'date' }).then(dt => {
				this.assess.bedUpTime = dt;	// TODO Test to see if this is now removable as I suspect
			})
		} else {
			this.bedUpTime.setValue(this.assess.bedUpTime);
			this.bedUpTime.open();
		}
	}
}
