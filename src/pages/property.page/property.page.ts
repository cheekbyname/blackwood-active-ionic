// Angular/Ionic
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

// Models
import { Property } from '../../models/property';

@Component({
    selector: 'property-page',
    templateUrl: 'property.page.html'
})
export class PropertyPage {

    property: Property;

    constructor(private navParms: NavParams) {
        this.property = this.navParms.get('prop');
    }
}