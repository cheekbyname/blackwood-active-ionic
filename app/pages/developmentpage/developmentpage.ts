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

import { MemberService } from '../../services/member.service';
import { PropertyService } from '../../services/property.service';
import { CommService } from '../../services/comm.service';

@Component({
	templateUrl: 'build/pages/developmentpage/developmentpage.html',
	directives: [TenancyCard, PropertyCard]
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
		console.log("Open Map");
	}

	openNav(): void {
		console.log("Open Nav");
	}

	gotoTenancy(ten: Tenancy): void {
		// TODO None of this should really be here
		let displayComms = ["T", "MT", "E", "I"];

        let mems = this.memberService.getMembers()
			.then(mems => mems.filter(mem => mem.houseRef == ten.houseRef));
        let prop = this.propertyService.getProperties()
			.then(props => props.find(prop => prop.propRef == ten.propRef));
		let coms = this.commService.getComms()
			.then(coms => coms.filter(com => com.houseRef == ten.houseRef))
			.then(coms => coms.filter(com => displayComms.some(dis => dis == com.commsTypeRef)));

		Promise.all([mems, prop, coms]).then(values => { 
			this.navCtrl.push(TenancyPage, {ten: ten, mems: values[0], prop: values[1], coms: values[2]})
		});
    }
}