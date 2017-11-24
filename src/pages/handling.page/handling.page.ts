// Angular/Ionic
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'handling.page.html'
})
export class HandlingPage implements OnInit {

	assess: CareInitialAssessment;
	form: FormGroup;
	
	constructor(public actSrv: CareActivityService, public navCtrl: NavController, public params: NavParams ) {
		this.assess = this.params.get("assess");
		this.form = this.params.get("form");
	}

	ngOnInit() {
		// TODO REMOVE
		// this.form.addControl('aboutPerson', new FormControl());
		// this.form.addControl('bodyBuildWeight', new FormControl());
		// this.form.addControl('bodyBuildHeight', new FormControl());
		// this.form.addControl('riskFalls', new FormControl());
		// this.form.addControl('problems', new FormControl());
		// this.form.addControl('constraints', new FormControl());
		// this.form.addControl('transferSpec', new FormControl());
		// this.form.addControl('transferPeople', new FormControl());
		// this.form.addControl('transferWalkingAid', new FormControl());
		// this.form.addControl('transferAdditional', new FormControl());
		// this.form.addControl('toiletSpec', new FormControl());
		// this.form.addControl('toiletSpec', new FormControl());
		// this.form.addControl('toiletWalkingAid', new FormControl());
		// this.form.addControl('toiletAdditional', new FormControl());
		// this.form.addControl('bedpanSpec', new FormControl());
		// this.form.addControl('bedpanPeople', new FormControl());
		// this.form.addControl('bedpanAdditional', new FormControl());
		// this.form.addControl('bedMoveSpec', new FormControl());
		// this.form.addControl('bedMoveHandlingAid', new FormControl());
		// this.form.addControl('bedMovePeople', new FormControl());
		// this.form.addControl('bedMoveAdditional', new FormControl());
		// this.form.addControl('bedTransferSpec', new FormControl());
		// this.form.addControl('bedTransferPeople', new FormControl());
		// this.form.addControl('bedTransferAdditional', new FormControl());
		// this.form.addControl('bedsideSpec', new FormControl());
		// this.form.addControl('bedsidePeople', new FormControl());
		// this.form.addControl('bedsideAdditional', new FormControl());
		// this.form.addControl('bathShowerWhich', new FormControl());
		// this.form.addControl('bathShowerHandlingAid', new FormControl());
		// this.form.addControl('bathShowerSpec', new FormControl());
		// this.form.addControl('bathShowerPeople', new FormControl());
		// this.form.addControl('bathShowerAdditional', new FormControl());
		// this.form.addControl('walkingSpec', new FormControl());
		// this.form.addControl('walkingWalkingAid', new FormControl());
		// this.form.addControl('walkingPeople', new FormControl());
		// this.form.addControl('walkingAdditional', new FormControl());
		// this.form.addControl('otherInstructions', new FormControl());
	}
}
