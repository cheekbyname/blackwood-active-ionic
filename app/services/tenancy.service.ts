import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Tenancy } from '../models/tenancy';

@Injectable()
export class TenancyService {
    
    constructor(private api: WebApi){}

    allTenancies: Tenancy[];

    getTenancies(): Promise<Tenancy[]> {
        if (this.allTenancies) {
            return Promise.resolve(this.allTenancies);
        }
        else {
        return this.api.getAll("tenancies")
            .then(tens => this.allTenancies = tens as Tenancy[])
            .then(tens => tens as Tenancy[]);
        }
    }
}