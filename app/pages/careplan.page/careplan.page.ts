import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Client } from '../../models/client';
import { CarePlan } from '../../models/careplan';
import { CareNeed } from '../../models/careneed';
import { ClientService } from '../../services/client.service';

@Component({
	templateUrl: 'build/pages/careplan.page/careplan.page.html'
})
export class CarePlanPage implements OnInit {

	constructor(public clientService: ClientService, navCtrl: NavController, navParams:NavParams ) {
		this.client = navParams.get("client");
	}

	ngOnInit(): void {
		this.clientService.getCarePlanForClient(this.client).then(cp => {
			this.carePlan = cp;
			this.careNeeds = cp.careNeeds;
		});
	}

	public client: Client;
	public carePlan: CarePlan;
	public careNeeds: CareNeed[];
}