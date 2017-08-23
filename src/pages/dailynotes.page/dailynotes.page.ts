import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController, Events } from 'ionic-angular';

import { Client } from '../../models/client';
import { DailyNote } from '../../models/dailynote';
import { ClientService } from '../../services/client.service';
import { AddDailyNotePage } from '../../pages/adddailynote.page/adddailynote.page';

@Component({
	selector: 'dailynotes-page',
	templateUrl: 'dailynotes.page.html'
})
export class DailyNotesPage implements OnInit {
	constructor(public clientService: ClientService, public navCtrl: NavController, navParams: NavParams,
		public popCtrl: PopoverController, public events: Events, public alerts: AlertController) {
		this.client = navParams.get("client");
	}

	ngOnInit(): void {
		this.pageIndex = 0;
		this.fetchNotes();
		this.events.subscribe("AddDailyNotePage.saveEntry", (note) => {
			this.saveNewNote(note);
		});
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
		return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString().substr(0, 5);
	}

	public pageOlder(): void {
		if (this.hasOlder) {	// An approximation of there being more data
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

	public addNewNote(): void {
		this.navCtrl.push(AddDailyNotePage, { client: this.client });
	}

	public saveNewNote(note: DailyNote): void {
		this.dailyNotes.unshift(note);
		var alert = this.alerts.create({
			message: "This function is not implemented yet. Your Daily Note has not been saved to CareSys.",
			title: "Sorry", subTitle: "Function Not Implemented", buttons: [
				{
					text: "Ok", handler: () => {
						alert.dismiss();
					}
				}
			]
		});
		alert.present();
		// TODO Call API with new Note data
	}
}