import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Client } from '../models/client';

@Injectable()
export class ClientService {
	constructor(private api: WebApi) { }

	getClients(): Promise<Client[]> {
		return this.api.getAll("care/clients", "api")
			.then(clis => clis as Client[]);
	}
}
