import { Component, Input } from '@angular/core';

import { Facility } from '../../models/facility';

@Component({
	selector: 'facility-card',
	templateUrl: 'facility.card.html'
})
export class FacilityCard {
	@Input()
	fac: Facility;
}