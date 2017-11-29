// Angular/Ionic
import { Injectable } from '@angular/core';
import { Response } from "@angular/http";
import { AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Sql } from './sql.service';

// Services
import { WebApi } from './api.service';
import { UserService } from './user.service';
import { DebugService } from './debug.service';

// Models
import { CareInitialAssessment } from '../models/careinitialassessment';

@Injectable()
export class CareActivityService {

	currentCareInitialAssessment: CareInitialAssessment;
	static readonly visitTypes: string[] = ['Personal Care', 'Non-Personal Care', 'Housing Support'];

	constructor(private api: WebApi, private usrSrv: UserService, private toastCtrl: ToastController, public debug: DebugService,
		public kv: Storage, private sql: Sql, private alertCtrl: AlertController) {
		sql.query('CREATE TABLE IF NOT EXISTS careinitialassessments (guid TEXT, json TEXT)', [])
			.catch(err => {
				this.simpleAlert(err, "Unable to create careinitialassessments table.")
			});
	}

	newCareInitialAssessment(): Promise<CareInitialAssessment> {
		if (this.debug.enableDummyData) {
			return this.api.getJSON('bilbo.json').then(data => {
				this.currentCareInitialAssessment = data.json();
			}).then(x => {
				return this.currentCareInitialAssessment;
			});
		}
		else {
			var newAssess = new CareInitialAssessment();
			newAssess.guid = Guid.newGuid();
			newAssess.visitDate = new Date().toISOString();
			newAssess.activeUser = this.usrSrv.currentUser;
			newAssess.visitBy = newAssess.activeUser.simpleName;
			newAssess.dateOfBirth = null;
			this.currentCareInitialAssessment = newAssess;
			return Promise.resolve(this.currentCareInitialAssessment);
		}
	}

	getCurrentCareInitialAssessment(): CareInitialAssessment {
		return this.currentCareInitialAssessment;
	}

	// TODO Return Promise<Response>
	saveCareInitialAssessment(assess: CareInitialAssessment): Promise<Response> {
		var keyUrl = this.assessUrlFromGuid(assess.guid);	// This for saving via webAPI when it's done
		return this.sql.query('SELECT * FROM careinitialassessments WHERE guid=?', [assess.guid])
			.catch(err => this.simpleAlert(err, "Unable to retrieve careinitialassessments."))
			.then(data => {
				return (data.res.rows.length > 0);
			})
			.then(exists => {
				if (exists) {
					this.sql.query('UPDATE careinitialassessments SET json=? WHERE guid=?', [JSON.stringify(assess), assess.guid])
						.catch(err => this.simpleAlert(err, "Unable to Update Care Assessment"));
				} else {
					this.sql.query('INSERT INTO careinitialassessments (guid, json) VALUES (?, ?)', [assess.guid, JSON.stringify(assess)])
						.catch(err => this.simpleAlert(err, "Unable to Insert Care Assessment"));
				}
				var toast = this.toastCtrl.create({ message: 'Changes to Care Initial Assessment saved locally', duration: 3000 });
				toast.present();
			})
			.then(done => {
				return this.api.putOne('care/careinitialassessment', assess)
					.catch(err => { return Promise.reject(err) });
			})
			.then(done => {
				console.log(keyUrl + " saved to sqlstorage");
			});
	}

	// TODO Possibly redundant - consider for removal
	getCareInitialAssessment(guid: string): Promise<CareInitialAssessment> {
		var keyUrl = this.assessUrlFromGuid(guid);
		return this.kv.get(keyUrl).then(res => {
			return res as CareInitialAssessment
		});
	}

	getAllCareInitialAssessments(): Promise<CareInitialAssessment[]> {

		// TODO Consider sorting explicitly given that new Assessments may be displayed out-of-order

		let sqlQry: Promise<CareInitialAssessment[]> = this.sql.query("SELECT * FROM careinitialassessments")
			.then(qry => {
				let sqlResults: any = qry.res.rows;
				let sqlRows: CareInitialAssessment[] = [];

				for (var i = 0; i < sqlResults.length; i++) {
					sqlRows.push(JSON.parse(sqlResults.item(i).json));
				}
				return Promise.resolve(sqlRows);
			});

		let apiCall: Promise<CareInitialAssessment[]> = this.api.getAll("care/careinitialassessments");

		let chain: Promise<CareInitialAssessment[]> = apiCall
			.then(apiRes => {
				return sqlQry.then(sqlRes => {
					let combined = apiRes;
					let apiKeys = apiRes.map(res => { return res.guid });
					sqlRes.forEach(res => {
						// Include local sqlite version if not included in data from server
						if (!apiKeys.some(key => key == res.guid)) {
							combined.push(res);
						}
						// Overwrite server version if it's in both, in case changes have occurred offline
						else {
							let pos = combined.findIndex(ele => ele.guid == res.guid);
							combined.splice(pos, 1, res);
						}
					});
					return Promise.resolve(combined);
				})
					.catch(err => {
						return Promise.reject("Unable to retrieve Care Initial Assessments from server, or to find any stored locally.");
					});
			})
			.catch(reason => {
				return sqlQry;
			});

		return chain;
	}

	assessUrlFromGuid(guid: string): string {
		return "care/initialassessments?assessGuid=" + guid;
	}

	simpleAlert(err: any, msg: string) {
		let errAlert = this.alertCtrl.create({
			title: "SqLite DB Fail",
			message: msg + " Message was: " + err.tx + err.err,
			buttons: ["Ok"]

		});
		errAlert.present();
	}
}

// TODO Consider moving to some Utility Service at some point
class Guid {
	static newGuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}