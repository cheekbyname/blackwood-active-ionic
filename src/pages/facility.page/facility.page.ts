// Angular/Ionic
import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Components
import { ClientPage } from '../../pages/client.page/client.page';

// Models
import { Client } from '../../models/client';
import { Facility } from '../../models/facility';

// Services
import { ClientService } from '../../services/client.service';
import { FacilityService } from '../../services/facility.service';

@Component({
    selector: 'facility-page',
    templateUrl: 'facility.page.html'
})
export class FacilityPage {

    fac: Facility;
    clients: Client[] = [];

    constructor(public facSrv: FacilityService, public cliSrv: ClientService, private navCtrl: NavController, private navParms: NavParams) {
        this.fac = this.navParms.get("fac");
        this.clients = this.cliSrv.getClientsForFacility(this.fac.facilityGuid).sort((a, b) => {
            return a.surname < b.surname ? -1 : 1;
        });
    }

    gotoClient(cli: Client) {
        this.navCtrl.push(ClientPage, {client: cli, facility: this.fac});
    }
}