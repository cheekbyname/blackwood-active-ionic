import { Component, Input } from '@angular/core';

import { Property } from '../../models/property';

@Component({
	selector: 'property-card',
	templateUrl: 'build/components/propertycard/propertycard.html'
})
export class PropertyCard {
	@Input()
	prop: Property;
}