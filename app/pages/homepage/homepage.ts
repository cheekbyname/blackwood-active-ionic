import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, Events } from 'ionic-angular';

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
import { ClientPage } from '../client.page/client.page';
import { AssessTabsPage } from '../assesstabs.page/assesstabs.page';

import { TenancyCard } from '../../components/tenancycard/tenancycard';
import { PropertyCard } from '../../components/propertycard/propertycard';
import { DevelopmentCard } from '../../components/developmentcard/developmentcard';
import { FacilityCard } from '../../components/facility.card/facility.card';
import { ClientCard } from '../../components/client.card/client.card';
import { HomeFilterPopover } from '../../components/homefilter.popover/homefilter.popover';
import { NewActivityPopover } from '../../components/newactivity.popover/newactivity.popover';

@Component({
    templateUrl: 'build/pages/homepage/homepage.html',
    directives: [ TenancyCard, PropertyCard, DevelopmentCard, ClientCard, FacilityCard ],
    providers: [ AlertController ]
})
export class HomePage implements OnInit {
    
    constructor(public navCtrl: NavController, private popoverCtrl: PopoverController,
        public developmentService: DevelopmentService, public tenancyService: TenancyService,
        public propertyService: PropertyService, public memberService: MemberService,
        public commService: CommService, public facilityService: FacilityService,
        public clientService: ClientService, public events: Events,
        public alert: AlertController) { }

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

    showCloud: boolean = true;
    cloudWarn: boolean = false;

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

    cloudControl(show: boolean, warn: boolean) {

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
            this.showFacilities = false;
            this.showClients = false;
            this.showTenancies = !this.showTenancies;
        }
    }

    toggleDevelopments(): void {
        if (this.developments && this.developments.length > 0) {
            this.showProperties = false;
            this.showFacilities = false;
            this.showClients = false;
            this.showDevelopments = !this.showDevelopments;
        }
    }

    toggleProperties(): void {
        if (this.properties && this.properties.length > 0) {
            this.showDevelopments = false;
            this.showFacilities = false;
            this.showClients = false;
            this.showProperties = !this.showProperties;
        }
    }

    toggleFacilities(): void {
        if (this.facilities && this.facilities.length > 0) {
            this.showDevelopments = false;
            this.showProperties = false;
            this.showClients = false;
            this.showFacilities = !this.showFacilities;
        }
    }

    toggleClients(): void {
        if (this.clients && this.clients.length > 0) {
            this.showDevelopments = false;
            this.showProperties = false;
            this.showFacilities = false;
            this.showClients = !this.showClients;
        }
    }

    searchAll(ev: any): void {
        let searchTerm = ev.target.value;

        if (searchTerm && searchTerm.trim() != '') {
            // Filter lists
            this.tenancies = this.allTenancies.filter(ten =>
                ten.houseDesc.toLowerCase().includes(searchTerm.toLowerCase()));
            this.developments = this.allDevelopments.filter(dev =>
                dev.schemeName.toLowerCase().includes(searchTerm.toLowerCase()));
            this.properties = this.allProperties.filter(prop =>
                prop.topAddressLine.toLowerCase().includes(searchTerm.toLowerCase()));
            this.facilities = this.allFacilities.filter(fac =>
                fac.facilityName.toLowerCase().includes(searchTerm.toLowerCase()));
            this.clients = this.allClients.filter(cli => 
                (cli.forename.toLowerCase() + cli.surname.toLowerCase()).includes(searchTerm.toLowerCase()));
        }
        else {
            // Reset filtered lists
            this.tenancies = this.allTenancies;
            this.developments = this.allDevelopments;
            this.properties = this.allProperties;
            this.facilities = this.allFacilities;
            this.clients = this.allClients;
            // And hide them
            this.collapseAll();
        }
    }

    gotoDevelopment(dev: Development): void {
        let props = this.allProperties.filter(prop => prop.schemeRef == dev.schemeRef); 
        let tens = this.allTenancies.filter(ten =>
            props.map(prop => prop.propRef).indexOf(ten.propRef) != -1);
        this.navCtrl.push(DevelopmentPage, {development: dev, properties: props, tenancies: tens});
    }

	gotoTenancy(ten: Tenancy): void {
        // TODO None of this should really be here either
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

    gotoClient(client: Client, facility: Facility): void {
        this.navCtrl.push(ClientPage, {client: client, facility: facility});
    }

    collapseAll(): void {
        this.showDevelopments = false;
        this.showTenancies = false;
        this.showProperties = false;
        this.showFacilities = false;
        this.showClients = false;
    }

    showFilters(ev) {
            let filterPop = this.popoverCtrl.create(HomeFilterPopover);
            filterPop.present({
                ev: ev
            });
    }

    facilityForClient(client: Client): Facility {
        return this.allFacilities.find(fac => fac.facilityGuid == client.facilityGuid);
    }

    showDataServiceStatus(): void {
        let statusAlert = this.alert.create({
            title: 'Data Service Status',
            subTitle: 'There will be some details here about connection status, etc.',
            buttons: ['OK']
        });
        statusAlert.present();
    }

    addNewActivity(ev): void {
        this.navCtrl.push(AssessTabsPage);
        // let activityPop = this.popoverCtrl.create(NewActivityPopover);
        // activityPop.present({
        //     ev: ev
        // });
    }
}