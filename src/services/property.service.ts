import { Injectable } from '@angular/core';

import { UserService } from "./user.service";
import { WebApi } from './api.service';

import { Property } from '../models/property';

@Injectable()
export class PropertyService {

    constructor(private api: WebApi, private usrSrv: UserService) {
        this.usrSrv.userObserver.subscribe(user => {
            this.getProperties().then(props => {
                this.allProperties = props;
            });
        });
    }

    allProperties: Property[];

    getProperties(): Promise<Property[]> {
        if (this.allProperties) {
            return Promise.resolve(this.allProperties);
        }
        else {
            return this.api.getAll("housing/properties")
                .then(props => this.allProperties = props as Property[])
                .then(props => props as Property[]);
        }
    }
}