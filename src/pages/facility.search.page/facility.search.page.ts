// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Models
import { Facility } from '../../models/facility';

// Components
import { FacilityPage } from '../../pages/facility.page/facility.page';

// Services
import { SearchService } from '../../services/search.service';

@Component({
	selector: 'facility-search-page',
	templateUrl: 'facility.search.page.html'
})
export class FacilitySearchPage {

	constructor(private navCtrl: NavController, public search: SearchService) {

	}

	gotoFacility(fac: Facility) {
		this.navCtrl.push(FacilityPage, {fac: fac});
	}
}