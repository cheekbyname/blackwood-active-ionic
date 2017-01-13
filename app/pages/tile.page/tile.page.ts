// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'build/pages/tile.page/tile.page.html'
})
export class TilePage {
	constructor(public navCtrl: NavController, public actSrv: CareActivityService) {
		this.assess = this.actSrv.getCurrentCareInitialAssessment();
	}

	assess: CareInitialAssessment;
}