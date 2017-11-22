// Angular/Ionic
import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NavController, AlertController } from 'ionic-angular';

// Models
import { CareInitialAssessment } from "../../models/careinitialassessment";

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
export class AssessTabsPage implements AfterViewInit {

	tabs: Tab[] = [
		new Tab("Assessment", InitialAssessPage),
		new Tab("Checklist", AssessCheckPage),
		new Tab("Handling", HandlingPage),
		new Tab("T.I.L.E", TilePage)
	];

	showAlert: boolean = true;
	assess: CareInitialAssessment;
	savedAssess: CareInitialAssessment;
	initialAssessForm: any;

	constructor(private navCtrl: NavController, public actSrv: CareActivityService, public alertCtrl: AlertController,
		public formBuilder: FormBuilder) {
		this.assess = this.actSrv.getCurrentCareInitialAssessment();
		this.initialAssessForm = formBuilder.group({});
	}

	ngAfterViewInit() {
		this.savedAssess = this.initialAssessForm.value;
	}

	ionViewCanLeave() {
		if (this.showAlert && this.initialAssessForm.dirty) {
			let confirmLeave = this.alertCtrl.create({
				cssClass: 'customAlert',
				title: 'Unsaved Changes',
				message: 'You have unsaved changes! Are you sure you want to leave this Assessment?',
				buttons: [
					{ text: 'Cancel', handler: () => true },
					{
						text: 'Discard', handler: () => {
							this.initialAssessForm.reset(this.savedAssess);
							confirmLeave.dismiss().then(() => {
								this.showAlert = false;
								this.navCtrl.pop();
							});
						}
					},
					{
						text: 'Save', handler: () => {
							this.saveAssessment();
							confirmLeave.dismiss().then(() => {
								this.showAlert = false;
								this.navCtrl.pop();
							});
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

	// resetForm() {
	// 	this.initialAssessForm.reset(this.savedAssess);
	// }
}

class Tab {
	title: string;
	page: any;

	constructor(title: string, page: any) {
		this.title = title;
		this.page = page;
	}
}