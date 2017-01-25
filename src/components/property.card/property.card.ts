import { Component, Input } from '@angular/core';

import { Property } from '../../models/property';

@Component({
	selector: 'property-card',
	templateUrl: 'property.card.html'
})
export class PropertyCard {
	@Input()
	prop: Property;
}