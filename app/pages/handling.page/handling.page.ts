// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'build/pages/handling.page/handling.page.html'
})
export class HandlingPage {
	constructor(public navCtrl: NavController, public actSrv: CareActivityService) {
		this.assess = actSrv.getCurrentCareInitialAssessment();
	}

	assess: CareInitialAssessment;

	transferPeople: number;
	tolietingPeople: number;
	bedpanPeople: number;
	bedMovePeople: number;
	bedTransferPeople: number;
	bedSidePeople: number;
	bathShowerPeople: number;
	walkingSpec: number;
	walkingPeople: number;

}
