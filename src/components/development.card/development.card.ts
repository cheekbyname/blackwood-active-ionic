import { Component, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { Development } from '../../models/development';

@Component({
	selector: 'development-card',
	templateUrl: 'development.card.html'
})
export class DevelopmentCard {
	@Input()
	dev: Development;

	constructor(private domSan: DomSanitizer) {}

	geoLink(dev: Development) {
		return this.domSan.bypassSecurityTrustUrl(`geo:0,0?=${dev.schemeName}+${dev.postTown}+${dev.postCode}`);
	}
}