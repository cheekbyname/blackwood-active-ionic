// Angular/Ionic
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Components
import { TenancyCommsPage } from '../tenancy.comms.page/tenancy.comms.page';
import { TenancyMembersPage } from '../tenancy.members.page/tenancy.members.page';

// Services
import { TenancyService, TenancyView } from '../../services/tenancy.service';

@Component({
	templateUrl: 'tenancy.tabs.page.html'
})
export class TenancyTabsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, private tenSrv: TenancyService ) {
		this.view = this.tenSrv.setCurrentTenancy(this.navParams.get("ten"));
		this.tenancyCommsPage = TenancyCommsPage;
		this.tenancyMembersPage = TenancyMembersPage;
	}

	view: TenancyView;

	tenancyCommsPage: any;
	tenancyMembersPage: any;	
}