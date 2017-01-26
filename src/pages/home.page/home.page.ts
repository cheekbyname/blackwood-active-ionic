// Angular/Ionic
import { Component } from '@angular/core';
import { NavController, PopoverController, AlertController, Events, FabContainer } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';
import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';

// Models
import { ActiveUser } from '../../models/activeuser';

// Components
import { DevelopmentListPage } from '../development.list.page/development.list.page';
import { TenancySearchPage } from '../tenancy.search.page/tenancy.search.page';
import { ClientSearchPage } from '../client.search.page/client.search.page';
import { AssessTabsPage } from '../assesstabs.page/assesstabs.page';
import { FacilitySearchPage } from '../facility.search.page/facility.search.page';

import { HomeFilterPopover } from '../../components/homefilter.popover/homefilter.popover';
import { NewActivityPopover } from '../../components/newactivity.popover/newactivity.popover';

@Component({
    selector: 'home-page',
    templateUrl: 'home.page.html',
    providers: [AlertController] // TODO We probably want this as a singleton
})
export class HomePage {

    constructor(public navCtrl: NavController, private popoverCtrl: PopoverController, public search: SearchService, public events: Events,
        public alert: AlertController, public actSrv: CareActivityService, public usrSrv: UserService) {
        this.getCurrentUser();
        this.search.go();
    }

    currentUser: ActiveUser;
    hailUser: string;

    showCloud: boolean = true;
    cloudWarn: boolean = false;

    cloudControl(show: boolean, warn: boolean) {

    }

    getCurrentUser(): void {
        this.usrSrv.getActiveUser()
            .then(user => {
                this.currentUser = this.usrSrv.currentUser;
                this.hailUser = this.currentUser.simpleName.substr(0, this.currentUser.simpleName.indexOf(' '));
            });
    }

    searchAll(ev: any): void {
        this.search.term = ev.target.value;
        this.search.go();
    }

    showFilters(ev) {
        let filterPop = this.popoverCtrl.create(HomeFilterPopover);
        filterPop.present({
            ev: ev
        });
    }

    showDataServiceStatus(): void {
        let statusAlert = this.alert.create({
            title: 'Data Service Status',
            subTitle: 'There will be some details here about connection status, etc.',
            buttons: ['OK']
        });
        statusAlert.present();
    }

    addNewCareInitialAssessment(event, fab: FabContainer) {
        this.actSrv.newCareInitialAssessment().then(ass => {
            this.navCtrl.push(AssessTabsPage);
            fab.close();
        });
    }

    openDevelopmentList() {
        this.navCtrl.push(DevelopmentListPage);
    }

    openTenancySearch() {
        this.navCtrl.push(TenancySearchPage);
    }

    openFacilitySearch() {
        this.navCtrl.push(FacilitySearchPage);
    }

    openClientSearch() {
        this.navCtrl.push(ClientSearchPage);
    }
}