import { Component } from "@angular/core";
import { NavParams, ViewController} from "ionic-angular";

import { CareContact } from "../../models/contact";
import { CareRelationship } from "../../models/carerelationship";
import { AddressType } from "../../models/addresstype";

import { CareActivityService } from "../../services/care.activity.service";

@Component({
    templateUrl: 'carecontact.modal.html'
})
export class CareContactModal {
    constructor(private viewCtrl: ViewController, private params: NavParams, public actSrv: CareActivityService) {
        this.contact = params.get('contact');
        this.actSrv.getAllAddressTypes().then(a => this.addressTypes = a);
        this.actSrv.getAllCareRelationships().then(r => this.relationships = r);
    }

    contact: CareContact;
    relationships: CareRelationship[];
    addressTypes: AddressType[];

    public dismiss() {
        this.viewCtrl.dismiss();
    }
}