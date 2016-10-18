import { Component, Input } from '@angular/core';

import { Facility } from '../../models/facility';

@Component({
	selector: 'facility-card',
	templateUrl: 'build/components/facility.card/facility.card.html'
})
export class FacilityCard {
	@Input()
	facility: Facility;
}