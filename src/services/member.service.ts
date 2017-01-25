import { Injectable } from '@angular/core';

import { WebApi } from './api.service';

import { Member } from '../models/member';
import { Relationship } from '../models/relationship';

@Injectable()
export class MemberService {
    
    constructor(private api: WebApi) {
        this.getMembers();
        this.getRelationships();
    }

    allMembers: Member[];
    allRelationships: Relationship[];

    getMembers(): Promise<Member[]> {
        if (this.allMembers) {
            console.log("Returning Members from memory");
            return Promise.resolve(this.allMembers);
        }
        else {
            console.log("Retrieving Members from WebApi");
            return this.api.getAll("housing/members")
                .then(mems => this.allMembers = mems as Member[])
                .then(mems => mems as Member[]);
        }
    }

    getRelationships(): Promise<Relationship[]> {
        if (this.allRelationships) {
            console.log("Returning Relationships from memory");
            return Promise.resolve(this.allRelationships);
        }
        else {
            console.log("Retrieving Relationships from WebApi");
            return this.api.getAll("housing/relationships")
                .then(rels => this.allRelationships = rels as Relationship[])
                .then(rels => rels as Relationship[]);
        }
    }
}