// Angular/Ionic
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Models
import { Development } from '../../models/development';
import { Tenancy } from '../../models/tenancy';
import { Property } from '../../models/property';

// Components
import { TenancyListPage } from '../tenancy.list.page/tenancy.list.page';
import { PropertyListPage } from '../property.list.page/property.list.page';

@Component({
	selector: 'development-tabs-page',
	templateUrl: 'development.tabs.page.html'
})
export class DevelopmentTabsPage {

	// TODO Consider moving some of this to a DevelopmentView as per TenancyView in TenancyService
	development: Development;
	tenancies: Tenancy[];
	properties: Property[];
	tenancyListPage: any;
	propertyListPage: any;
	tenancyTabParms: any;
	propertyTabParms: any;

	constructor(navCtrl: NavController, navParms: NavParams) {
		this.development = navParms.get('development');
		this.tenancies = navParms.get('tenancies');
		this.properties = navParms.get('properties');
		this.tenancyListPage = TenancyListPage;
		this.tenancyTabParms = { tenancies: navParms.get('tenancies'), development: navParms.get('development') };
		this.propertyListPage = PropertyListPage;
		this.propertyTabParms = { properties: navParms.get('properties'), development: navParms.get('development') };
	}
}