import { Component, Input } from '@angular/core';

import { Development } from '../../models/development';

@Component({
	selector: 'development-card',
	templateUrl: 'build/components/developmentcard/developmentcard.html',
	providers: [Development]
})
export class DevelopmentCard {
	@Input()
	dev: Development;
}