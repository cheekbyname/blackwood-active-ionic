import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CareNeed } from '../../models/careneed';
import { CarePlan } from '../../models/careplan';
import { Client } from '../../models/client';

@Component({
	templateUrl: 'caresummary.page.html',
	styles: [
		'span {font-size:12pt;}',
		'ion-card-header { padding-bottom: 0px}'
	]
})
export class CareSummaryPage {
	constructor(public navCtrl: NavController, private navParm: NavParams ) {
		this.client = this.navParm.get("client");
		let cp: CarePlan = this.navParm.get("carePlan");
		this.carePlan = cp;
		this.careNeeds = cp.careNeeds;
		let outcomes = Array.from(new Set(this.careNeeds.map(cn=> {
			return cn.outcomeDesc;
		})));
		this.summaries = outcomes.map(oc => {
			var newSum = new Summary();
			newSum.outcomeDesc = oc.substr(oc.indexOf(".") +1);
			newSum.summaries = [].concat.apply([], cp.careNeeds
				.filter(cn => cn.outcomeDesc === oc)
				.map(cn => {
					if (cn.summary) return cn.summary.split("\r\n");
					return [];
				})).filter(sm => sm !== "");
			return newSum;
		})
		// this.summaries = [].concat.apply([], this.careNeeds.map(cn => {
 		// 	return cn.summary.split("\r\n")})).filter(sm => sm !== "");
	}

	public client: Client;
	public carePlan: CarePlan;
	public careNeeds: CareNeed[];
	public summaries: Summary[];

}

class Summary {
	public outcomeDesc: string;
	public summaries: string[];
}