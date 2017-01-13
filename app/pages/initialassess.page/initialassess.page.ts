// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'build/pages/initialassess.page/initialassess.page.html',
	styles: [ './initialassess.page.scss' ]
})
export class InitialAssessPage {

	constructor(public navCtrl: NavController, public actSrv: CareActivityService) {
		this.assess = this.actSrv.getCurrentCareInitialAssessment();
	}

	assess: CareInitialAssessment;
}
