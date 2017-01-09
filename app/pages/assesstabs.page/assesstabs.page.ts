import { Component } from '@angular/core';

import { InitialAssessPage } from '../../pages/initialassess.page/initialassess.page';

@Component({
	templateUrl: './assesstabs.page.html'
})
export class AssessTabsPage {
	initialAssessPage = InitialAssessPage;

	constructor() {
		
	}
}