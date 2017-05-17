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

	showAlert: boolean = true;

	constructor(private navCtrl: NavController, public actSrv: CareActivityService, public alertCtrl: AlertController) {

	}

	ionViewCanLeave() {
		if (this.showAlert) {
			let confirmLeave = this.alertCtrl.create({
				title: 'Leave Assessment?',
				message: 'Are you sure you want to leave this Assessment? You may have unsaved changes!',
				buttons: [
					{ text: 'No', handler: () => true },
					{
						text: 'Yes', handler: () => {
							confirmLeave.dismiss().then(() => {
								this.showAlert = false;
								this.navCtrl.pop();
							})
						}
					}
				]
			});
			confirmLeave.present();
			return false;
		}
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