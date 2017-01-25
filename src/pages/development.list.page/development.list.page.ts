import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Development } from '../../models/development';

import { DevelopmentService } from '../../services/development.service';
import { PropertyService } from '../../services/property.service';
import { TenancyService } from '../../services/tenancy.service';
import { SearchService } from '../../services/search.service';

import { DevelopmentTabsPage } from '../../pages/development.tabs.page/development.tabs.page';

@Component({
    selector: 'development-list-page',
    templateUrl: './development.list.page.html'
})
export class DevelopmentListPage {

    constructor(private devSrv: DevelopmentService, private propSrv: PropertyService, private tenSrv: TenancyService,
        public search: SearchService, private navCtrl: NavController) {
    }

    gotoDevelopment(dev: Development): void {
        let props = this.propSrv.allProperties.filter(prop => prop.schemeRef == dev.schemeRef); 
        let tens = this.tenSrv.allTenancies.filter(ten =>
            props.map(prop => prop.propRef).indexOf(ten.propRef) != -1).sort((a, b) => {
                return a.propRef < b.propRef ? -1 : 1;
            });
        this.navCtrl.push(DevelopmentTabsPage, {development: dev, properties: props, tenancies: tens});
    }
}