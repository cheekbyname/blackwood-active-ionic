import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Member } from '../models/member';

@Injectable()
export class MemberService {
    
    constructor(private api: WebApi) {}

    allMembers: Member[];

    getMembers(): Promise<Member[]> {
        if (this.allMembers) {
            console.log("Retrieving Members from memory");
            return Promise.resolve(this.allMembers);
        }
        else {
            console.log("Retrieving Members from WebApi");
            return this.api.getAll("members")
                .then(mems => this.allMembers = mems as Member[])
                .then(mems => mems as Member[]);
        }
    }
}