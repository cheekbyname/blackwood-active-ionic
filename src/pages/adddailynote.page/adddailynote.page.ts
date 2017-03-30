import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Client } from '../../models/client';
import { DailyNote } from '../../models/dailynote';
import { CareNeed } from '../../models/careneed';
import { Outcome } from '../../models/outcome';
import { ClientService } from '../../services/client.service';
import { UserService } from '../../services/user.service';

@Component({
	templateUrl: 'adddailynote.page.html'
})
export class AddDailyNotePage implements OnInit {
	client: Client;
	dailyNote: DailyNote;

	selectedDateTime: string;
	careNeeds: CareNeed[];
	outcomes: Outcome[];

	constructor(navParams: NavParams, private navCtrl: NavController,
		public clientService: ClientService, public events: Events, public usrSrv: UserService) {
		this.client = navParams.get("client");
		
		this.dailyNote = new DailyNote();
		this.dailyNote.clientGuid = this.client.clientGuid;
		var dt = new Date(Date.now());
		this.selectedDateTime = dt.toISOString();
	}

	ngOnInit(): void {
		this.clientService.getCarePlanForClient(this.client)
			.then(cp => this.careNeeds = cp.careNeeds);
		this.clientService.getOutcomes().then(ocs => this.outcomes = ocs);
		this.usrSrv.getActiveUser().then(name => {
			console.log("User was " + JSON.stringify(name));
			if (typeof this.dailyNote.noteUser === "undefined") {
				this.dailyNote.noteUser = name.simpleName;
			}
		});
	}

	cancelEntry(): void {
		this.navCtrl.pop();
	}

	saveEntry(): void {
		// TODO Call a ClientService method that will save the data via the api
		// TODO Also figure out a way of refreshing the data on DailyNotesPage once we have
		// this.dailyNote.outcomeGuid = this.selectedOutcome.outcomeGuid;
		this.dailyNote.noteDate = new Date(this.selectedDateTime);
		this.events.publish("AddDailyNotePage.saveEntry", this.dailyNote);
		this.navCtrl.pop();
	}
}