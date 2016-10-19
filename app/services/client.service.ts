import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Client } from '../models/client';
import { CarePlan } from '../models/careplan';

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
}
