// Angular/Ionic
import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';

// Services
import { CareActivityService } from '../../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../../models/careinitialassessment';

@Component({
	templateUrl: 'handling.page.html'
})
export class HandlingPage {

	assess: CareInitialAssessment;
	form: FormGroup;
	
	constructor(public actSrv: CareActivityService, public navCtrl: NavController, public params: NavParams ) {
		this.assess = this.params.get("assess");
		this.form = this.params.get("form");
	}
}
