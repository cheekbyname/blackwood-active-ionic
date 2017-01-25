// Angular/Ionic
import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Models
import { Facility } from '../../models/facility';

// Services
import { FacilityService } from '../../services/facility.service';

@Component({
    selector: 'facility-page',
    templateUrl: 'facility.page.html'
})
export class FacilityPage {

    fac: Facility;

    constructor(public facSrv: FacilityService, private navCtrl: NavController, private navParms: NavParams) {
        this.fac = this.navParms.get("fac");
    }
}