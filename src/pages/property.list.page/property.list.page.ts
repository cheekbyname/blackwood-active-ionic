// Angular/Ionic
import { Component } from '@angular/core';
import { NavParams, App } from 'ionic-angular';

// Models
import { Property } from '../../models/property';
import { Development } from '../../models/development';

// Components
import { PropertyPage } from '../../pages/property.page/property.page';

@Component({
    selector: 'property-list-page',
    templateUrl: 'property.list.page.html'
})
export class PropertyListPage {

    development: Development;
    properties: Property[];

    constructor(private navParms: NavParams, private app: App) {
        this.properties = this.navParms.data.properties;
        this.development = this.navParms.data.development;
    }

    gotoProperty(prop: Property) {
        this.app.getRootNav().push(PropertyPage, {prop: prop});
    }
}