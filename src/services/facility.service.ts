import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Facility } from '../models/facility';

@Injectable()
export class FacilityService {

	allFacilities: Facility[];
	filteredFacilities: Facility[];

	constructor(private api: WebApi) {
		this.getFacilities().then(facs => {
			this.allFacilities = facs;
		});
	}

	getFacilities(): Promise<Facility[]> {
		return this.api.getAll("care/facilities", "api")
			.then(facs => {
				this.allFacilities = facs;
				return facs as Facility[];
			});
	}

	filterFacilities(term: string) {
        if (term && term.trim() != '') {
            this.filteredFacilities = this.allFacilities.filter(fac =>
                fac.facilityName.toLowerCase().includes(term.toLowerCase()));
        }
        else {
            this.filteredFacilities = this.allFacilities;
        }
	}
}