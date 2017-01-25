import { Component, Input } from '@angular/core';

import { Tenancy } from '../../models/tenancy';

@Component({
	selector: 'tenancy-card',
	templateUrl: 'tenancy.card.html'
})
export class TenancyCard {
	@Input()
	ten: Tenancy;
}