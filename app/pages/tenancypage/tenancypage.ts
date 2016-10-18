import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Tenancy } from '../../models/tenancy';
import { Property } from '../../models/property';
import { Member } from '../../models/member';
import { Comm } from '../../models/comm';

import { PropertyCard } from '../../components/propertycard/propertycard';
import { MemberCard } from '../../components/membercard/membercard';
import { CommCard } from '../../components/comm.card/comm.card';

@Component({
	templateUrl: 'build/pages/tenancypage/tenancypage.html',
	directives: [PropertyCard, MemberCard, CommCard ]
})
export class TenancyPage {
	constructor(public navCtrl: NavController, public navParams: NavParams ) {
		this.ten = navParams.get("ten");
		this.prop = navParams.get("prop");
		this.mems = navParams.get("mems");
		this.coms = navParams.get("coms");
	}

	ten: Tenancy;
	prop: Property;
	mems: Member[];
	coms: Comm[];


	showMembers: boolean = false;

	toggleMembers(): void {
		this.showMembers = !this.showMembers;
	}
}