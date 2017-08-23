import { Injectable } from '@angular/core';

import { UserService } from "./user.service";
import { WebApi } from './api.service';

import { Member } from '../models/member';
import { Relationship } from '../models/relationship';

@Injectable()
export class MemberService {

    constructor(private api: WebApi, private usrSrv: UserService) {
        this.usrSrv.userObserver.subscribe(user => {
            this.getMembers();
            this.getRelationships();
        });
    }

    allMembers: Member[];
    allRelationships: Relationship[];

    getMembers(): Promise<Member[]> {
        if (this.allMembers) {
            return Promise.resolve(this.allMembers);
        }
        else {
            return this.api.getAll("housing/members")
                .then(mems => this.allMembers = mems as Member[])
                .then(mems => mems as Member[]);
        }
    }

    getRelationships(): Promise<Relationship[]> {
        if (this.allRelationships) {
            return Promise.resolve(this.allRelationships);
        }
        else {
            return this.api.getAll("housing/relationships")
                .then(rels => this.allRelationships = rels as Relationship[])
                .then(rels => rels as Relationship[]);
        }
    }
}