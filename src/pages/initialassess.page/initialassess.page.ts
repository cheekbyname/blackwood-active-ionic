// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'initialassess.page.html'
})
export class InitialAssessPage {

	constructor(public navCtrl: NavController, public actSrv: CareActivityService) {
		
	}

	assess: CareInitialAssessment = new CareInitialAssessment();

	ionViewWillEnter() {
		this.assess = this.actSrv.getCurrentCareInitialAssessment();
		console.log(this.actSrv.getCurrentCareInitialAssessment());
	}
}
