import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { TenancyService } from '../../services/tenancy.service';
import { DevelopmentService } from '../../services/development.service';
import { PropertyService } from '../../services/property.service';
import { MemberService } from '../../services/member.service';
import { CommService} from '../../services/comm.service';
import { FacilityService } from '../../services/facility.service';
import { ClientService } from '../../services/client.service';

import { Tenancy } from '../../models/tenancy';
import { Development } from '../../models/development';
import { Property } from '../../models/property';
import { Member } from '../../models/member';
import { Comm } from '../../models/comm';
import { Facility } from '../../models/facility';
import { Client } from '../../models/client';

import { DevelopmentPage } from '../developmentpage/developmentpage';
import { TenancyPage } from '../tenancypage/tenancypage';

import { TenancyCard } from '../../components/tenancycard/tenancycard';
import { PropertyCard } from '../../components/propertycard/propertycard';
import { DevelopmentCard } from '../../components/developmentcard/developmentcard';
import { HomeFilterPopover } from '../../components/homefilter.popover/homefilter.popover';

@Component({
    templateUrl: 'build/pages/homepage/homepage.html',
    directives: [TenancyCard, PropertyCard, DevelopmentCard]
})
export class HomePage implements OnInit {
    
    constructor(public navCtrl: NavController, private popoverCtrl: PopoverController,
        public developmentService: DevelopmentService, public tenancyService: TenancyService,
        public propertyService: PropertyService, public memberService: MemberService,
        public commService: CommService, public facilityService: FacilityService, public clientService: ClientService) { }

    allTenancies: Tenancy[];
    allDevelopments: Development[];
    allProperties: Property[];
    allMembers: Member[];
    allFacilities: Facility[];
    allClients: Client[];

    tenancies: Tenancy[];
    developments: Development[];
    properties: Property[];
    facilities: Facility[];
    clients: Client[];

    showTenancies: boolean = false;
    showDevelopments: boolean = false;
    showProperties: boolean = false;
    showFacilities: boolean = false;
    showClients: boolean = false;

    ngOnInit(): void {
        this.getTenancies();
        this.getDevelopments();
        this.getProperties();
        this.getMembers();
        this.getFacilities();
        this.getClients();
    }

    getFacilities(): void {
        this.facilityService.getFacilities()
            .then(facs => this.initFacilities(facs));
    }

    initFacilities(facs: Facility[]): void {
        this.allFacilities = facs;
        this.facilities = facs;
    }

    getClients(): void {
        this.clientService.getClients()
            .then(clis => this.initClients(clis));
    }

    initClients(clis: Client[]): void {
        this.allClients = clis;
        this.clients = clis;
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
        if (this.tenancies && this.tenancies.length > 0) {
            this.showDevelopments = false;
            this.showProperties = false;
            this.showTenancies = !this.showTenancies;
        }
    }

    toggleDevelopments(): void {
        if (this.developments && this.developments.length > 0) {
            this.showTenancies = false;
            this.showProperties = false;
            this.showDevelopments = !this.showDevelopments;
        }
    }

    toggleProperties(): void {
        if (this.properties && this.properties.length > 0) {
            this.showDevelopments = false;
            this.showTenancies = false;
            this.showProperties = !this.showProperties;
        }
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
        // TODO None of this should really be here either
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

    collapseAll(): void {
        this.showDevelopments = false;
        this.showTenancies = false;
        this.showProperties = false;
    }

    showFilters(ev) {
            let filterPop = this.popoverCtrl.create(HomeFilterPopover);
            filterPop.present({
                ev: ev
            });
    }
}