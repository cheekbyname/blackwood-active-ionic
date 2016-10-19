import { Client } from './client';
import { CareNeed } from './careneed';

export class CarePlan {
	client: Client;
	careNeeds: CareNeed[];
}