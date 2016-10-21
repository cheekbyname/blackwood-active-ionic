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
		this.pageIndex = 0;
		this.fetchNotes();
	}

	client: Client;
	dailyNotes: DailyNote[];
	pageIndex: number;
	hasOlder = false;
	hasNewer = false;

	private fetchNotes(): void {
		this.clientService.getDailyNotesForClient(this.client, this.pageIndex)
			.then(dns => {
				this.dailyNotes = dns;
				this.hasNewer = (this.pageIndex > 0);
				this.hasOlder = (this.dailyNotes.length === 10);
			});
	}

	public formatDate(date: Date): string {
		var dt = new Date(date.toString());
		return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString().substr(0,5);
	}

	public pageOlder(): void {
		if(this.hasOlder) {	// An approximation of there being more data
			this.pageIndex++;
			this.fetchNotes();
		}
	}

	public pageNewer(): void {
		if (this.hasNewer) {
			this.pageIndex--;
			this.fetchNotes();
		}
	}
}