import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CareNeed } from '../../models/careneed';

@Component({
	templateUrl: 'build/pages/careneed.page/careneed.page.html'
})
export class CareNeedPage {
	constructor(private navCtrl: NavController, private navParam: NavParams) {
		this.careNeed = navParam.get("careNeed");
	}
	public careNeed: CareNeed;
}