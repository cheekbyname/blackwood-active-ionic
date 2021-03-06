import { Injectable } from '@angular/core';

import { UserService } from "./user.service";
import { WebApi } from './api.service';
import { Development } from '../models/development';

@Injectable()
export class DevelopmentService {

    allDevelopments: Development[];
    filteredDevelopments: Development[];

    constructor(private api: WebApi, private usrSrv: UserService) {
        this.usrSrv.userObserver.subscribe(user => {
            this.getDevelopments().then(devs => {
                this.allDevelopments = devs;
            });
        });
    }

    getDevelopments(): Promise<Development[]> {
        return this.api.getAll("housing/developments")
            .then(devs => devs as Development[]);
    }

    filterDevelopments(term: string) {
        if (term && term.trim() != '') {
            this.filteredDevelopments = this.allDevelopments.filter(dev =>
                dev.schemeName.toLowerCase().includes(term.toLowerCase())
                || dev.postTown.toLowerCase().includes(term.toLowerCase()));
        }
        else {
            this.filteredDevelopments = this.allDevelopments;
        }
    }
}