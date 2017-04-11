// Angular/Ionic
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

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

	constructor(public navCtrl: NavController, public actSrv: CareActivityService, public alertCtrl: AlertController) {

	}

	ionViewWillLeave() {
		// TODO Make this a prompt on changes only and place a Save button in the Header
		let confirmLeave = this.alertCtrl.create({
			title: 'Back to Home?',
			message: 'Are you sure you want to leave this Assessment? You may have unsaved changes!',
			buttons: [
				{ text: 'No' },
				{ text: 'Yes' }
			]
		})
		confirmLeave.present();
		//this.actSrv.saveCareInitialAssessment(this.actSrv.getCurrentCareInitialAssessment());
	}

	saveAssessment() {
		let confirmSave = this.alertCtrl.create({
			title: 'Save Changes?',
			message: 'Are you sure you want to save the changes to this Initial Assessment?',
			buttons: [
				{ text: 'No' },
				{
					text: 'Yes', handler: () => {
						this.actSrv.saveCareInitialAssessment(this.actSrv.currentCareInitialAssessment);
					}
				}
			]
		});
		confirmSave.present();
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