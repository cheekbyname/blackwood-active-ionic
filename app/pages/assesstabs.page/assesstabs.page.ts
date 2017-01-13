// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Components
import { InitialAssessPage } from '../../pages/initialassess.page/initialassess.page';
import { AssessCheckPage } from '../../pages/assesscheck.page/assesscheck.page';
import { HandlingPage } from '../../pages/handling.page/handling.page';
import { TilePage } from '../../pages/tile.page/tile.page';

// Services
import { CareActivityService } from '../../services/care.activity.service';

@Component({
	templateUrl: 'build/pages/assesstabs.page/assesstabs.page.html'
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
		this.actSrv.saveCareInitialAssessment(this.actSrv.getCurrentCareInitialAssessment());
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