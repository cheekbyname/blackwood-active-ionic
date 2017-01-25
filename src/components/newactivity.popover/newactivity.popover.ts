import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

import { InitialAssessPage } from '../../pages/initialassess.page/initialassess.page';

@Component({
	templateUrl: 'newactivity.popover.html'
})
export class NewActivityPopover {
	constructor(private viewCtrl: ViewController, private navCtrl: NavController) { }

	dismiss(): void {
		this.viewCtrl.dismiss();
	}

	beginActivity(): void {
		this.viewCtrl.dismiss();
		this.navCtrl.push(InitialAssessPage);
		this.viewCtrl.dismiss();
	}
}