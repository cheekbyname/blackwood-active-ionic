// Angular/Ionic
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

// Services
import { TenancyService, TenancyView } from '../../services/tenancy.service';

@Component({
    selector: 'tenancy-comms-page',
    templateUrl: 'tenancy.comms.page.html'
})
export class TenancyCommsPage {
    constructor(private tenSrv: TenancyService, private navParms: NavParams) {
        this.view = this.navParms.data;
    }

    view: TenancyView;
}