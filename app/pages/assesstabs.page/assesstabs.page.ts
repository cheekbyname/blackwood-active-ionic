import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InitialAssessPage } from '../../pages/initialassess.page/initialassess.page';
import { AssessCheckPage } from '../../pages/assesscheck.page/assesscheck.page';
import { HandlingPage } from '../../pages/handling.page/handling.page';

@Component({
	templateUrl: 'build/pages/assesstabs.page/assesstabs.page.html'
})
export class AssessTabsPage {
	initialAssessPage: any;
	assessCheckPage: any;
	handlingCheckPage: any;

	constructor(public navCtrl: NavController) {
		this.initialAssessPage = InitialAssessPage;
		this.assessCheckPage = AssessCheckPage;
		this.handlingCheckPage = HandlingPage;
	}
}