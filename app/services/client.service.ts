import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Client } from '../models/client';
import { CarePlan } from '../models/careplan';
import { DailyNote } from '../models/dailynote';

@Injectable()
export class ClientService {
	constructor(private api: WebApi) { }

	getClients(): Promise<Client[]> {
		return this.api.getAll("care/clients", "api")
			.then(clis => clis as Client[]);
	}

	getCarePlanForClient(client: Client): Promise<CarePlan> {
		return this.api.getOne("care/careplanbyclient?clientGuid=" + client.clientGuid, "api")
			.then(cp => cp as CarePlan);
	}

	getDailyNotesForClient(client: Client): Promise<DailyNote[]> {
		return this.api.getAll("care/dailynotesbyclient?clientGuid=" + client.clientGuid, "api")
			.then(dns => dns as DailyNote[]);
	}
}
