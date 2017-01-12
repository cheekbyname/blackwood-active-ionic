import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'build/pages/initialassess.page/initialassess.page.html',
	styles: [ './initialassess.page.scss' ]
})
export class InitialAssessPage {

	constructor(public navCtrl: NavController, public navParm: NavParams) {
		this.assess = navParm.data;
	}

	assess: CareInitialAssessment;
}
