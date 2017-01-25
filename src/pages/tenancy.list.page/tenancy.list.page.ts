// Angular/Ionic
import { Component } from '@angular/core';
import { NavParams, App } from 'ionic-angular';

// Components
import { TenancyTabsPage } from '../../pages/tenancy.tabs.page/tenancy.tabs.page';

// Models
import { Tenancy } from '../../models/tenancy';
import { Development } from '../../models/development';

@Component({
    selector: 'tenancy-list-page',
    templateUrl: 'tenancy.list.page.html'
})
export class TenancyListPage {

    development: Development;
    tenancies: Tenancy[];

    constructor(private navParms: NavParams, private app: App) {
        this.tenancies = this.navParms.data.tenancies;
        this.development = this.navParms.data.development;
    }

    gotoTenancy(ten: Tenancy) {
        this.app.getRootNav().push(TenancyTabsPage, {ten: ten});
    }
}