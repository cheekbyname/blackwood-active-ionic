// Angular/Ionic
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Components
import { InitialAssessPage } from '../../pages/initialassess.page/initialassess.page';
import { AssessCheckPage } from '../../pages/assesscheck.page/assesscheck.page';
import { HandlingPage } from '../../pages/handling.page/handling.page';
import { TilePage } from '../../pages/tile.page/tile.page';

// Services
import { ActivityService } from '../../services/activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

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

	assess: CareInitialAssessment;

	constructor(public navCtrl: NavController, navParm: NavParams, public actSrv: ActivityService) {
		this.assess = navParm.get("assess");
	}

	ionViewWillLeave() {
		this.actSrv.saveCareInitialAssessment(this.assess);
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