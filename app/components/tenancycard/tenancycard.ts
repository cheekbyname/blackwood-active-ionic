import { Component, Input } from '@angular/core';

import { Tenancy } from '../../models/tenancy';

@Component({
	selector: 'tenancy-card',
	templateUrl: 'build/components/tenancycard/tenancycard.html'
})
export class TenancyCard {
	@Input()
	ten: Tenancy;
}