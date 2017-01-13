// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'build/pages/assesscheck.page/assesscheck.page.html'
})
export class AssessCheckPage {
	constructor(public navCtrl: NavController, public actSrv: CareActivityService) {
		this.assess = actSrv.getCurrentCareInitialAssessment();		
	}

	assess: CareInitialAssessment;

	items: CheckItem[] = [
		new CheckItem("Are internal floors/flooring free from slip and trip hazards?"),
		new CheckItem("Are external areas even and free from holes/loose slabs?"),
		new CheckItem("Are steps, ramps and stairs in good condition?"),
		new CheckItem("Are external access routes free from steep slopes which could be hazardous in icy conditions?"),
		new CheckItem("Is access in general free from hazards?"),
		new CheckItem("Are there no apparent electrical hazards e.g. dodgy wiring, very old switches?"),
		new CheckItem("Is there sufficient lighting inlcuding internal and external artificial light, to safely perform tasks required?"),
		new CheckItem("Is the house free from pets/pests?", "no", "If no, give details. Give details of any concerns e.g. dangerous dogs"),
		new CheckItem("Do occupants avoid smoking while you are in the house?"),
		new CheckItem("Is the neighbourhood one that you would feel comfortable visiting at all times of day?", "no", "If no, describe your concerns"),
		new CheckItem("Would you rate the risk of violence or abuse from the occupants as 'Low'?"),
		new CheckItem("Is the client free from known infection risks?"),
		new CheckItem("Is there a mobile phone signal throughout the areas of the property you visit?"),
		new CheckItem("Are there any hazards related to the work you do e.g. patient handling with insufficient space/incorrect equipment, use of cleaning chemicals, sharps, etc?"),
		new CheckItem("Is there any equipment provided for your use ar the property, e.g. by your employer, by another organisation or by the client?", "yes", "If yes, is the equipment properly maintained?")
	];
	fullAssessReqd: String;
}

class CheckItem {
	itemName: string;
	value: string;
	furtherValue: string;
	furtherTitle: string;
	further: string;
	
	constructor(itemName: string, furtherValue?: string, furtherTitle?: string) {
		this.itemName = itemName;
		this.furtherValue = furtherValue;
		this.furtherTitle = furtherTitle;
	}
}
