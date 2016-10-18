import { Component, Input } from '@angular/core';

import { Client } from '../../models/client';
import { Facility } from '../../models/facility';

@Component({
	selector: 'client-card',
	templateUrl: 'build/components/client.card/client.card.html'
})
export class ClientCard {
	@Input()
	client: Client;

	@Input()
	facility: Facility;
}