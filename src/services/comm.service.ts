import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Comm } from '../models/comm';

@Injectable()
export class CommService {
	constructor(private api: WebApi) {
		this.getComms();
	}

	allComms: Comm[];

    public static readonly displayComms = ["T", "MT", "E", "I"];

	getComms(): Promise<Comm[]> {
		return this.api.getAll("housing/comms")
			.then(coms => {
				this.allComms = coms;
				return coms as Comm[];
			});
	}
}
