import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Client } from '../../models/client';
import { Facility } from '../../models/facility';
import { FacilityCard } from '../../components/facility.card/facility.card';
import { ClientService } from '../../services/client.service';
import { CarePlanPage } from '../../pages/careplan.page/careplan.page';
import { DailyNotesPage } from '../../pages/dailynotes.page/dailynotes.page';

@Component({
	templateUrl: 'build/pages/client.page/client.page.html',
	styles: [ './client.page.scss' ],
	directives: [ FacilityCard ]
})
export class ClientPage {
	constructor(public navCtrl: NavController, public navParams: NavParams, public clientService: ClientService) {
		this.client = navParams.get("client");
		this.facility = navParams.get("facility");
	}

	public client: Client;
	public facility: Facility;

	gotoCarePlan(): void {
		this.navCtrl.push(CarePlanPage, { client: this.client });
	}

	gotoDetails(): void {

	}

	gotoNotes(): void {
		this.navCtrl.push( DailyNotesPage, { client: this.client });
	}
}