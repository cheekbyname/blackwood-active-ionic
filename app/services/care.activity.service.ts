// Angular/Ionic
import { Injectable } from '@angular/core';
import { SqlStorage, Storage } from 'ionic-angular';

// Services
import { WebApi } from './api.service';
import { UserService } from './user.service';

// Models
import { CareInitialAssessment } from '../models/careinitialassessment';

@Injectable()
export class CareActivityService {

	sql: Storage;
	private currentCareInitialAssessment: CareInitialAssessment;

	constructor(private api: WebApi, private usrSrv: UserService) {
		this.sql = new Storage(SqlStorage);
	}

	newCareInitialAssessment(): Promise<CareInitialAssessment> {
		var newAssess = new CareInitialAssessment();
        newAssess.visitDate = new Date().toISOString();
        return Promise.resolve(this.usrSrv.getActiveUser().then(user => {
			newAssess.user = user;
			newAssess.visitBy = user.simpleName;
		}).then(x => {
			this.currentCareInitialAssessment = newAssess;
			return this.currentCareInitialAssessment;
		}));
	}

	getCurrentCareInitialAssessment(): CareInitialAssessment {
		return this.currentCareInitialAssessment;
	}

	saveCareInitialAssessment(assess: CareInitialAssessment): void {
		console.log(assess);
	}
}