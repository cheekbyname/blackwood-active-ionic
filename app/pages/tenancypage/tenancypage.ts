import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Tenancy } from '../../models/tenancy';
import { Property } from '../../models/property';
import { Member } from '../../models/member';

import { PropertyCard } from '../../components/propertycard/propertycard';
import { MemberCard } from '../../components/membercard/membercard';

@Component({
	templateUrl: 'build/pages/tenancypage/tenancypage.html',
	providers: [Tenancy, Property, Member],
	directives: [PropertyCard, MemberCard]
})
export class TenancyPage {
	constructor(public navCtrl: NavController, public navParams: NavParams ) {
		this.ten = navParams.get("ten");
		this.prop = navParams.get("prop");
		this.mems = navParams.get("mems");
	}

	ten: Tenancy;
	prop: Property;
	mems: Member[];
}