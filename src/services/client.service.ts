import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Client } from '../models/client';
import { CarePlan } from '../models/careplan';
import { DailyNote } from '../models/dailynote';
import { Outcome } from '../models/outcome';

@Injectable()
export class ClientService {
	constructor(private api: WebApi) {
		this.getClients().then(clis => {
			this.allClients = clis;
		});
	}

	allClients: Client[];
	filteredClients: Client[];

	getClients(): Promise<Client[]> {
		if (this.allClients) {
			console.log("Returning Clients from memory");
			return Promise.resolve(this.allClients);
		}
		else {
			console.log("Returning Clients from Api");
			return this.api.getAll("care/clients", "api")
				.then(clis => {
					this.allClients = clis as Client[];
					return this.allClients;
				});
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

	getClientsForFacility(guid: string): Client[] {
		return this.allClients.filter(cli => cli.facilityGuid == guid);
	}

	filterClients(term: string) {
        if (term && term.trim() != '') {
            this.filteredClients = this.allClients.filter(cli =>
                cli.surname.toLowerCase().includes(term.toLowerCase())
                || cli.forename.toLowerCase().includes(term.toLowerCase()));
        }
        else {
            this.filteredClients = this.allClients;
        }
	}
}
