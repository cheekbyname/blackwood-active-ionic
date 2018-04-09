// Angular/Ionic
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

// Services
import { CareActivityService } from '../../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../../models/careinitialassessment';

@Component({
	templateUrl: 'tile.page.html'
})
export class TilePage {
	constructor(public navCtrl: NavController, public actSrv: CareActivityService, public params: NavParams) {
		this.assess = this.params.get("assess");
		this.form = this.params.get("form");
	}

	assess: CareInitialAssessment;
	form: FormGroup;
}