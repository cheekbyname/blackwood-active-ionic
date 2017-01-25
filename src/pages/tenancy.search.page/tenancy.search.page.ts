// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Models
import { Tenancy } from '../../models/tenancy';

// Components
import { TenancyTabsPage } from '../../pages/tenancy.tabs.page/tenancy.tabs.page';

// Services
import { SearchService } from '../../services/search.service';

@Component({
    selector: 'tenancy-search-page',
    templateUrl: 'tenancy.search.page.html'
})
export class TenancySearchPage {

    constructor(public search: SearchService, private navCtrl: NavController) {

    }

    gotoTenancy(ten: Tenancy) {
        this.navCtrl.push(TenancyTabsPage, {ten: ten});
    }
}