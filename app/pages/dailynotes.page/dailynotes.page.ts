import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Client } from '../../models/client';
import { DailyNote } from '../../models/dailynote';
import { ClientService } from '../../services/client.service';

@Component({
	templateUrl: 'build/pages/dailynotes.page/dailynotes.page.html'
})
export class DailyNotesPage {
	constructor(public clientService: ClientService, navCtrl: NavController, navParams: NavParams) {
		this.client = navParams.get("client");
	}

	ngOnInit(): void {
		this.clientService.getDailyNotesForClient(this.client)
			.then(dns => this.dailyNotes = dns as DailyNote[]);
	}

	client: Client;
	dailyNotes: DailyNote[];

	public formatDate(date: Date): string {
		var dt = new Date(date.toString());
		return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString().substr(0,5);
	}
}