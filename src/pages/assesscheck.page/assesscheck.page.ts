// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'assesscheck.page.html'
})
export class AssessCheckPage {
	
	constructor(public navCtrl: NavController, public actSrv: CareActivityService) {
		this.assess = actSrv.getCurrentCareInitialAssessment();		
	}

	assess: CareInitialAssessment;
}

