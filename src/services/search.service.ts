// Angular/Ionic
import { Injectable } from '@angular/core';

// Models
import { Development } from '../models/development';
import { Tenancy } from '../models/tenancy';
import { Facility } from '../models/facility';
import { Client } from '../models/client';

import { DevelopmentService } from './development.service';
import { TenancyService } from './tenancy.service';
import { FacilityService } from './facility.service';
import { ClientService } from './client.service';

@Injectable()
export class SearchService {

    term: string = "";

    constructor(private devSrv: DevelopmentService, private tenSrv: TenancyService, private facSrv: FacilityService,
        private cliSrv: ClientService) {
    }

    // TODO Make these Observables or at least Promises - There is a performance impact for large lists
    developments(): Development[] {
        if (this.term && this.term.trim() != '') {
            return this.devSrv.filteredDevelopments;
        }
        else {
            return this.devSrv.allDevelopments;
        }
    };

    tenancies(): Tenancy[] {
        if (this.term && this.term.trim() != '') {
            return this.tenSrv.filteredTenancies;
        }
        else {
            return this.tenSrv.allTenancies;
        }
    }

    facilities(): Facility[] {
        if (this.term && this.term.trim() != '') {
            return this.facSrv.filteredFacilities;
        }
        else {
            return this.facSrv.allFacilities;
        }
    }

    clients(): Client[] {
        if (this.term && this.term.trim() != '') {
            return this.cliSrv.filteredClients;
        }
        else {
            return this.cliSrv.allClients;
        }
    }

    go() {
        this.devSrv.filterDevelopments(this.term);
        this.tenSrv.filterTenancies(this.term);
        this.facSrv.filterFacilities(this.term);
        this.cliSrv.filterClients(this.term);
    }
}