import { Component, Input } from '@angular/core';

import { Development } from '../../models/development';

@Component({
	selector: 'development-card',
	templateUrl: 'development.card.html'
})
export class DevelopmentCard {
	@Input()
	dev: Development;
}