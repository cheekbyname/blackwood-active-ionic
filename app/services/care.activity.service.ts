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
		newAssess.guid = Guid.newGuid();
        newAssess.visitDate = new Date().toISOString();
		newAssess.user = this.usrSrv.currentUser;
		newAssess.visitBy = newAssess.user.simpleName;
		this.currentCareInitialAssessment = newAssess;
		return Promise.resolve(this.currentCareInitialAssessment);
	}

	getCurrentCareInitialAssessment(): CareInitialAssessment {
		return this.currentCareInitialAssessment;
	}

	saveCareInitialAssessment(assess: CareInitialAssessment): void {
		var url = "care/initialassessments?assessGuid=" + assess.guid;
		this.sql.setJson(url, assess);
		console.log(url + " saved to sqlstorage");
	}
}

class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}