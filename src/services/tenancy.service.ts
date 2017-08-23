import { Injectable } from '@angular/core';

import { Tenancy } from '../models/tenancy';
import { Comm } from '../models/comm';
import { Member } from '../models/member';
import { Property } from '../models/property';

import { CommService } from '../services/comm.service';
import { MemberService } from '../services/member.service';
import { PropertyService } from '../services/property.service';
import { UserService } from './user.service';
import { WebApi } from './api.service';

@Injectable()
export class TenancyService {

    constructor(private api: WebApi, private comSrv: CommService, private memSrv: MemberService,
        private propSrv: PropertyService, private usrSrv: UserService) {
        this.usrSrv.userObserver.subscribe(user => {
            this.getTenancies().then(tens => {
                this.allTenancies = tens;
            });
        });
    }

    allTenancies: Tenancy[];
    filteredTenancies: Tenancy[];
    view: TenancyView;

    getTenancies(): Promise<Tenancy[]> {
        if (this.allTenancies) {
            return Promise.resolve(this.allTenancies);
        }
        else {
            return this.api.getAll("housing/tenancies")
                .then(tens => this.allTenancies = tens as Tenancy[])
                .then(tens => tens as Tenancy[]);
        }
    }

    setCurrentTenancy(ten: Tenancy): TenancyView {
        this.view = new TenancyView(ten);
        this.view.property = this.propSrv.allProperties.find(prop => { return prop.propRef === this.view.tenancy.propRef });
        this.view.members = this.memSrv.allMembers.filter(mem => { return mem.houseRef === this.view.tenancy.houseRef })
            .sort((a, b) => { return a.personNo < b.personNo ? -1 : 1 });
        this.view.comms = this.comSrv.allComms.filter(com => {
            return com.houseRef === this.view.tenancy.houseRef
                && CommService.displayComms.some(dis => dis == com.commsTypeRef)
        });
        return this.view;
    }

    filterTenancies(term: string) {
        if (term && term.trim() != '') {
            this.filteredTenancies = this.allTenancies.filter(ten =>
                ten.houseDesc.toLowerCase().includes(term.toLowerCase())
                || ten.topAddressLine.toLowerCase().includes(term.toLowerCase()));
        }
        else {
            this.filteredTenancies = this.allTenancies;
        }
    }
}

export class TenancyView {
    tenancy: Tenancy;
    property: Property;
    members: Member[];
    comms: Comm[];

    constructor(ten: Tenancy) {
        this.tenancy = ten;
    }
}