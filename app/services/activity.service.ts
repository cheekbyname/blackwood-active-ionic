import { Injectable } from '@angular/core';
import { SqlStorage, Storage } from 'ionic-angular';

import { WebApi } from './api.service';
import { UserService } from './user.service';

import { CareInitialAssessment } from '../models/careinitialassessment';

@Injectable()
export class ActivityService {

	sql: Storage;

	constructor(private api: WebApi, private usrSrv: UserService) {
		this.sql = new Storage(SqlStorage);
	}

	newCareInitialAssessment(): Promise<CareInitialAssessment> {
		var assess = new CareInitialAssessment();
        assess.visitDate = new Date().toISOString();
        return Promise.resolve(this.usrSrv.getActiveUser().then(user => {
			assess.user = user;
			assess.visitBy = user.simpleName;
		}).then(x => { return assess }));
	}

	saveCareInitialAssessment(assess: CareInitialAssessment): void {
		console.log(assess);
	}
}