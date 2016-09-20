import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Tenancy } from '../../models/tenancy';
import { Development } from '../../models/development';
import { Property } from '../../models/property';
import { Member } from '../../models/member';
import { Comm } from '../../models/comm';

import { WebApi } from '../../services/api.service';

import { TenancyService } from '../../services/tenancy.service';
import { DevelopmentService } from '../../services/development.service';
import { PropertyService } from '../../services/property.service';
import { MemberService } from '../../services/member.service';
import { CommService} from '../../services/comm.service';

import { DevelopmentPage } from '../developmentpage/developmentpage';
import { TenancyPage } from '../tenancypage/tenancypage';

import { TenancyCard } from '../../components/tenancycard/tenancycard';
import { PropertyCard } from '../../components/propertycard/propertycard';
import { DevelopmentCard } from '../../components/developmentcard/developmentcard';

@Component({
    templateUrl: 'build/pages/homepage/homepage.html',
    providers: [PropertyService, DevelopmentService, TenancyService, MemberService, CommService, WebApi],
    directives: [TenancyCard, PropertyCard, DevelopmentCard]
})
export class HomePage implements OnInit {
    
    constructor(public navCtrl: NavController,
        private tenancyService: TenancyService,
        private developmentService: DevelopmentService,
        private propertyService: PropertyService,
        private memberService: MemberService,
        private commService: CommService) { }
    
    allTenancies: Tenancy[];
    allDevelopments: Development[];
    allProperties: Property[];
    allMembers: Member[];

    tenancies: Tenancy[];
    developments: Development[];
    properties: Property[];

    showTenancies: boolean = false;
    showDevelopments: boolean = false;
    showProperties: boolean = false;

    ngOnInit(): void {
        this.getTenancies();
        this.getDevelopments();
        this.getProperties();
        this.getMembers();
    }

    getTenancies(): void {
        this.tenancyService.getTenancies()
            .then(tens => this.initTenancies(tens));
    }

    initTenancies(tens: Tenancy[]): void {
        this.allTenancies = tens;
        this.tenancies = tens;
    }

    getDevelopments(): void {
        this.developmentService.getDevelopments()
            .then(devs => this.initDevelopments(devs));
    }

    initDevelopments(devs: Development[]): void {
        this.allDevelopments = devs;
        this.developments = devs;
    }

    getProperties(): void {
        this.propertyService.getProperties()
            .then(props => this.initProperties(props));
    }

    initProperties(props: Property[]): void {
        this.allProperties = props;
        this.properties = props;
    }

    getMembers(): void {
        this.memberService.getMembers()
            .then(mem => this.allMembers = mem);
    }

    toggleTenancies(): void {
        this.showDevelopments = false;
        this.showProperties = false;
        this.showTenancies = !this.showTenancies;
    }

    toggleDevelopments(): void {
        this.showTenancies = false;
        this.showProperties = false;
        this.showDevelopments = !this.showDevelopments;
    }

    toggleProperties(): void {
        this.showDevelopments = false;
        this.showTenancies = false;
        this.showProperties = !this.showProperties;
    }

    searchAll(ev: any): void {
        let searchTerm = ev.target.value;

        if (searchTerm && searchTerm.trim() != '') {
            // Filter lists
            this.tenancies = this.allTenancies.filter(ten =>
                ten.HouseDesc.toLowerCase().includes(searchTerm.toLowerCase()));
            this.developments = this.allDevelopments.filter(dev =>
                dev.SchemeName.toLowerCase().includes(searchTerm.toLowerCase()));
            this.properties = this.allProperties.filter(prop =>
                prop.TopAddressLine.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        else {
            // Reset filtered lists
            this.tenancies = this.allTenancies;
            this.developments = this.allDevelopments;
            this.properties = this.allProperties;
            // And hide them
            this.showTenancies = false;
            this.showDevelopments = false;
            this.showProperties = false;
        }
    }

    gotoDevelopment(dev: Development): void {
        let props = this.allProperties.filter(prop => prop.SchemeRef == dev.SchemeRef); 
        let tens = this.allTenancies.filter(ten =>
            props.map(prop => prop.PropRef).indexOf(ten.PropRef) != -1);
        this.navCtrl.push(DevelopmentPage, {development: dev, properties: props, tenancies: tens});
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