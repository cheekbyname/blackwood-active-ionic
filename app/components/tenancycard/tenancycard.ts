import { Component, Input } from '@angular/core';

import { Tenancy } from '../../models/tenancy';

@Component({
	selector: 'tenancy-card',
	templateUrl: 'build/components/tenancycard/tenancycard.html',
	providers: [Tenancy]
})
export class TenancyCard {
	@Input()
	ten: Tenancy;
}