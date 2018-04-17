import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NavParams, ViewController, AlertController } from "ionic-angular";

import { CareContact } from "../../models/contact";
import { CareRelationship } from "../../models/carerelationship";
import { AddressType } from "../../models/addresstype";

import { CareActivityService } from "../../services/care.activity.service";

@Component({
    templateUrl: 'carecontact.modal.html'
})
export class CareContactModal {
    constructor(private viewCtrl: ViewController, private params: NavParams, public actSrv: CareActivityService,
        public alertCtrl: AlertController) {
        this.contact = params.get('contact');
        this.form = params.get('form');
        this.actSrv.getAllAddressTypes().then(a => {
            this.addressTypes = a;
            this.contact.addressType = this.addressTypes.find(at => at.guid == this.contact.addressTypeId);
        });
        this.actSrv.getAllCareRelationships().then(r => {
            this.relationships = r;
            this.contact.relationship = this.relationships.find(rl => rl.guid == this.contact.careRelationshipId)
                || new CareRelationship();
        });
    }

    contact: CareContact;
    form: FormGroup;

    relationships: CareRelationship[];
    addressTypes: AddressType[];

    public dismiss() {
        this.viewCtrl.dismiss({ remove: false });
    }

    public remove() {
        var alert = this.alertCtrl.create({
            title: "Are you sure?", subTitle: "Please confirm that you want to remove this contact",
            message: "If this contact has already been saved to Blackwood's servers, it will not be removed from there. You should contact Business Solutions if such a contact needs to be permanently removed from our database.",
            buttons: [
                {
                    text: "Yes", handler: () => {
                        this.viewCtrl.dismiss({ remove: true });
                    }
                },
                { text: "No", handler: () => { } }
            ]
        });
        alert.present();
    }

    public relationChange(rel: CareRelationship) {
        this.contact.careRelationshipId = rel.guid;
    }

    public addressChange(add: AddressType) {
        this.contact.addressTypeId = add.guid;
    }
}