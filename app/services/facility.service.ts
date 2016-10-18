import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Facility } from '../models/facility';

@Injectable()
export class FacilityService {
	constructor(private api: WebApi) { }

	getFacilities(): Promise<Facility[]> {
		return this.api.getAll("facilities", "api")
			.then(facs => facs as Facility[]);
	}
}