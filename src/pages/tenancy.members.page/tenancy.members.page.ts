// Angular/Ionic
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

// Services
import { TenancyService, TenancyView } from '../../services/tenancy.service';

@Component({
    selector: 'tenancy-members-page',
    templateUrl: 'tenancy.members.page.html'
})
export class TenancyMembersPage {
    constructor(private tenSrv: TenancyService, private navParms: NavParams) {
        this.view = this.navParms.data;
    }

    view: TenancyView;
}