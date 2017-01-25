// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Models
import { Client } from '../../models/client';
import { Facility } from '../../models/facility';

// Components
import { ClientPage } from '../../pages/client.page/client.page';

// Services
import { SearchService } from '../../services/search.service';
import { FacilityService } from '../../services/facility.service';

@Component({
    selector: 'client-search-page',
    templateUrl: 'client.search.page.html'
})
export class ClientSearchPage {

    constructor(public search: SearchService, public facSrv: FacilityService, private navCtrl: NavController) {

    }

    gotoClient(cli: Client) {
        this.navCtrl.push(ClientPage, {client: cli, facility: this.facilityForClient(cli)});
    }

    facilityForClient(client: Client): Facility {
        return this.facSrv.allFacilities.find(fac => fac.facilityGuid == client.facilityGuid);
    }
}