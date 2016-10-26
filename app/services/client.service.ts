import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Client } from '../models/client';
import { CarePlan } from '../models/careplan';
import { DailyNote } from '../models/dailynote';
import { Outcome } from '../models/outcome';

@Injectable()
export class ClientService {
	constructor(private api: WebApi) { }

	allClients: Client[];

	getClients(): Promise<Client[]> {
		if (this.allClients) {
			console.log("Returning Clients from memory");
			return Promise.resolve(this.allClients);
		}
		else {
			console.log("Returning Clients from Api");
			return this.api.getAll("care/clients", "api")
				.then(clis => this.allClients = clis as Client[])
				.then(clis => clis as Client[]);
		}
	}

	getCarePlanForClient(client: Client): Promise<CarePlan> {
		return this.api.getOne("care/careplanbyclient?clientGuid=" + client.clientGuid, "api")
			.then(cp => cp as CarePlan);
	}

	getDailyNotesForClient(client: Client, pageIndex: number): Promise<DailyNote[]> {
		var req = "care/dailynotesbyclient"
			+ "?clientGuid=" + client.clientGuid
			+ "&offset=" + pageIndex;
		return this.api.getAll(req, "api").then(dns => dns as DailyNote[]);
	}

	getOutcomes(): Promise<Outcome[]> {
		return this.api.getAll("care/outcomes", "api").then(ocs => ocs as Outcome[]);
	}
}
