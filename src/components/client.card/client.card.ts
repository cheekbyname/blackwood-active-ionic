import { Component, Input } from '@angular/core';

import { Client } from '../../models/client';
import { Facility } from '../../models/facility';

@Component({
	selector: 'client-card',
	templateUrl: 'client.card.html'
})
export class ClientCard {
	@Input()
	cli: Client;

	@Input()
	fac: Facility;
}