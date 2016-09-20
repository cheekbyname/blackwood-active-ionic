import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { Development } from '../models/development';

@Injectable()
export class DevelopmentService {
    
    constructor(private api: WebApi) {}

    getDevelopments(): Promise<Development[]> {
        return this.api.getAll("developments")
            .then(devs => devs as Development[]);
    }
}