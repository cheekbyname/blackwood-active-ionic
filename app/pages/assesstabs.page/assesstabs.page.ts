import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InitialAssessPage } from '../../pages/initialassess.page/initialassess.page';
import { AssessCheckPage } from '../../pages/assesscheck.page/assesscheck.page';
import { HandlingPage } from '../../pages/handling.page/handling.page';
import { TilePage } from '../../pages/tile.page/tile.page';

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

	constructor(public navCtrl: NavController, navParm: NavParams) {
		this.assess = navParm.get("assess");
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