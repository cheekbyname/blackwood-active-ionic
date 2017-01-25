// Angular/Ionic
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

// Components
import { InitialAssessPage } from '../../pages/initialassess.page/initialassess.page';
import { AssessCheckPage } from '../../pages/assesscheck.page/assesscheck.page';
import { HandlingPage } from '../../pages/handling.page/handling.page';
import { TilePage } from '../../pages/tile.page/tile.page';

// Services
import { CareActivityService } from '../../services/care.activity.service';

@Component({
	templateUrl: 'assesstabs.page.html'
})
export class AssessTabsPage {

	tabs: Tab[] = [
		new Tab("Assessment", InitialAssessPage),
		new Tab("Checklist", AssessCheckPage),
		new Tab("Handling", HandlingPage),
		new Tab("T.I.L.E", TilePage)
	];

	constructor(public navCtrl: NavController, public actSrv: CareActivityService) {

	}

	ionViewWillLeave() {
		// TODO Make this a prompt on changes only and place a Save button in the Header
		//this.actSrv.saveCareInitialAssessment(this.actSrv.getCurrentCareInitialAssessment());
	}

	saveAssessment() {
		// TODO Add confirmation prompt?
		this.actSrv.saveCareInitialAssessment(this.actSrv.currentCareInitialAssessment);
	}
}

class Tab {
	title: string;
	page: any;

	constructor(title: string, page: any) {
		this.title = title;
		this.page = page;
	}
}