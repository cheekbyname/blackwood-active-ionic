import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Client } from '../../models/client';
import { DailyNote } from '../../models/dailynote';
import { CareNeed } from '../../models/careneed';
import { Outcome } from '../../models/outcome';
import { ClientService } from '../../services/client.service';

@Component({
	templateUrl: 'build/pages/adddailynote.page/adddailynote.page.html'
})
export class AddDailyNotePage {
	client: Client;
	dailyNote: DailyNote;

	selectedDateTime: string;
	selectedCareNeed: CareNeed;
	selectedOutcome: Outcome;
	careneeds: CareNeed[];
	outcomes: Outcome[];

	constructor(navParams: NavParams, private navCtrl: NavController,
		public clientService: ClientService) {
		this.client = navParams.get("client");
		
		this.dailyNote = new DailyNote();
		this.dailyNote.clientGuid = this.client.clientGuid;
		var dt = new Date(Date.now());
		this.selectedDateTime = dt.toISOString();
	}

	ngOnInit(): void {
		this.clientService.getCarePlanForClient(this.client)
			.then(cp => this.careneeds = cp.careNeeds);
		this.clientService.getOutcomes().then(ocs => this.outcomes = ocs);
	}

	cancelEntry(): void {
		this.navCtrl.pop();
	}

	saveEntry(): void {
		// TODO Call a ClientService method that will save the data via the api
		// TODO Also figure out a way of refreshing the data on DailyNotesPage once we have
		this.navCtrl.pop();
	}
}