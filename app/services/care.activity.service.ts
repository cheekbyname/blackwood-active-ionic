// Angular/Ionic
import { Injectable } from '@angular/core';
import { SqlStorage, Storage, ToastController } from 'ionic-angular';

// Services
import { WebApi } from './api.service';
import { UserService } from './user.service';

// Models
import { CareInitialAssessment } from '../models/careinitialassessment';

@Injectable()
export class CareActivityService {

	sql: Storage;
	currentCareInitialAssessment: CareInitialAssessment;
	visitTypes: string[] = ['Personal Care', 'Non-Personal Care', 'Housing Support'];

	constructor(private api: WebApi, private usrSrv: UserService, private toastCtrl: ToastController) {
		this.sql = new Storage(SqlStorage);
		this.sql.query('CREATE TABLE IF NOT EXISTS careinitialassessments (guid TEXT, json TEXT)');
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
		var keyUrl = this.assessUrlFromGuid(assess.guid);	// This for saving via webAPI when it's done
		this.sql.query('SELECT * FROM careinitialassessments WHERE guid=?', [assess.guid])
			.then(data => {
				return (data.res.rows.length > 0);
			})
			.then(exists => {
				if (exists) {
					this.sql.query('UPDATE careinitialassessments SET json=? WHERE guid=?', [JSON.stringify(assess), assess.guid]);
					var toast = this.toastCtrl.create({ message: 'Changes to Care Initial Assessment successfully saved', duration: 3000});
					toast.present();
				} else {
					this.sql.query('INSERT INTO careinitialassessments (guid, json) VALUES (?, ?)', [assess.guid, JSON.stringify(assess)]);
					var toast = this.toastCtrl.create({ message: 'Care Initial Assessment successfully saved', duration: 3000});
					toast.present();
				}
			})
			.then(done => {
				console.log(keyUrl + " saved to sqlstorage");
			});
	}

	// TODO Possibly redundant - consider for removal
	getCareInitialAssessment(guid: string): Promise<CareInitialAssessment> {
		var keyUrl = this.assessUrlFromGuid(guid);
		var assess: CareInitialAssessment;
		return this.sql.getJson(keyUrl).then(res => {
			return res as CareInitialAssessment});
	}

	getAllCareInitialAssessments(): Promise<CareInitialAssessment[]> {
		return this.sql.query('SELECT * FROM careinitialassessments', []).then(res => {
			var assessments: CareInitialAssessment[] = [];
			for (var i = 0; i < res.res.rows.length; i++) {
				assessments.push(JSON.parse(res.res.rows.item(i).json));
			}
			return assessments;
		});
	}

	assessUrlFromGuid(guid: string): string {
		return "care/initialassessments?assessGuid=" + guid;
	}
}

// TODO Consider moving to some Utility Service at some point
class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}