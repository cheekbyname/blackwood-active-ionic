import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Comm } from '../models/comm';

@Injectable()
export class CommService {
	constructor(private api: WebApi) { }

	getComms(): Promise<Comm[]> {
		return this.api.getAll("comms")
			.then(coms => coms as Comm[]);
	}
}
