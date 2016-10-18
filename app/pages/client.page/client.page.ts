import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Client } from '../../models/client';
import { Facility } from '../../models/facility';
import { FacilityCard } from '../../components/facility.card/facility.card';
import { ClientService } from '../../services/client.service';

@Component({
	templateUrl: 'build/pages/client.page/client.page.html',
	styles: [ './client.page.scss' ],
	directives: [ FacilityCard ]
})
export class ClientPage {
	constructor(public navCtr: NavController, public navParams: NavParams, public clientService: ClientService) {
		this.client = navParams.get("client");
		this.facility = navParams.get("facility");
	}

	public client: Client;
	public facility: Facility;
}