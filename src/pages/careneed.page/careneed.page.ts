import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Client } from '../../models/client';
import { CareNeed } from '../../models/careneed';

@Component({
	templateUrl: 'careneed.page.html'
})
export class CareNeedPage {
	constructor(private navCtrl: NavController, private navParam: NavParams) {
		this.careNeed = navParam.get("careNeed");
		this.client = navParam.get("client");
	}
	public careNeed: CareNeed;
	public client: Client;
}