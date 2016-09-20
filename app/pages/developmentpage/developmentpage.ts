import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Tenancy } from '../../models/tenancy';
import { Development } from '../../models/development';
import { Property } from '../../models/property';
import { Member } from '../../models/member';
import { Comm } from '../../models/comm';

import { TenancyPage } from '../tenancypage/tenancypage';

import { TenancyCard } from '../../components/tenancycard/tenancycard';
import { PropertyCard } from '../../components/propertycard/propertycard';

import { WebApi } from '../../services/api.service';
import { MemberService } from '../../services/member.service';
import { PropertyService } from '../../services/property.service';
import { CommService } from '../../services/comm.service';

@Component({
	templateUrl: 'build/pages/developmentpage/developmentpage.html',
	directives: [TenancyCard, PropertyCard],
	providers: [WebApi, MemberService, PropertyService, CommService, TenancyPage]
})
export class DevelopmentPage {
	constructor(public navCtrl: NavController, navParams: NavParams,
		public memberService: MemberService, public propertyService: PropertyService,
		public commService: CommService) {
		this.development = navParams.get("development");
		this.properties = navParams.get("properties");
		this.tenancies = navParams.get("tenancies");
	}

	development: Development;
	properties: Property[];
	tenancies: Tenancy[];

	showProperties: boolean = false;
	showTenancies: boolean = false;

	toggleProperties(): void {
		this.showTenancies = false;
		this.showProperties = !this.showProperties;
	}

	toggleTenancies(): void {
		this.showProperties = false;
		this.showTenancies = !this.showTenancies;
	}

	openMap(): void {
		alert("Open Map");
	}

	openNav(): void {
		alert("Open Nav");
	}

	gotoTenancy(ten: Tenancy): void {
		let displayComms = ["T", "MT", "E", "I"];

        let mems = this.memberService.getMembers()
			.then(mems => mems.filter(mem => mem.HouseRef == ten.HouseRef));
        let prop = this.propertyService.getProperties()
			.then(props => props.find(prop => prop.PropRef == ten.PropRef));
		let coms = this.commService.getComms()
			.then(coms => coms.filter(com => com.HouseRef == ten.HouseRef))
			.then(coms => coms.filter(com => displayComms.some(dis => dis == com.CommsTypeRef)));

		Promise.all([mems, prop, coms]).then(values => { 
			this.navCtrl.push(TenancyPage, {ten: ten, mems: values[0], prop: values[1], coms: values[2]})
		});
    }
}