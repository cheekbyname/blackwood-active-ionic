import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Client } from '../../models/client';
import { Facility } from '../../models/facility';
import { CarePlan } from '../../models/careplan';
import { CareNeed } from '../../models/careneed';
import { ClientService } from '../../services/client.service';
import { CarePlanPage } from '../../pages/careplan.page/careplan.page';
import { DailyNotesPage } from '../../pages/dailynotes.page/dailynotes.page';
import { CareSummaryPage } from '../../pages/caresummary.page/caresummary.page';

@Component({
	templateUrl: 'client.page.html'
})
export class ClientPage implements OnInit {
	constructor(public navCtrl: NavController, public navParams: NavParams,
		public clientService: ClientService) {
		this.client = navParams.get("client");
		this.facility = navParams.get("facility");
	}

	ngOnInit(): void {
		this.clientService.getCarePlanForClient(this.client).then(cp => {
			this.carePlan = cp;
			this.careNeeds = cp.careNeeds;
		});
	}

	public client: Client;
	public facility: Facility;
	public carePlan: CarePlan;
	public careNeeds: CareNeed[];

	gotoCarePlan(): void {
		this.navCtrl.push(CarePlanPage, { client: this.client,
			carePlan: this.carePlan });
	}

	gotoDetails(): void {

	}

	gotoNotes(): void {
		this.navCtrl.push( DailyNotesPage, { client: this.client });
	}

	gotoSummary(): void {
		this.navCtrl.push( CareSummaryPage, {client: this.client,
			carePlan: this.carePlan});
	}
}