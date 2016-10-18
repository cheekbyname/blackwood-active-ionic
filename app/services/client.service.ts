import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Client } from '../models/client';

@Injectable()
export class CommService {
	constructor(private api: WebApi) { }

	getComms(): Promise<Client[]> {
		return this.api.getAll("clients", "api")
			.then(clis => clis as Client[]);
	}
}
