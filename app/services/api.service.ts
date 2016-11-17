import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ToastController, Events, SqlStorage, Storage } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

import { Api } from './secret.service.ts';

@Injectable()
export class WebApi {
	constructor(private http: Http, private toastCtrl: ToastController, private api: Api,
		public events: Events) {
		this.sql = new Storage(SqlStorage);
	}

	sql: Storage;

	getAll(name: string, api?: string): Promise<any[]> {
		if (typeof api === "undefined") { api = "api"; }     // Use the new API by default

		console.log(`Calling ${this.api.apiBase(api)}/${name}`);
		return this.http.get(`${this.api.apiBase(api)}/${name}`) //, { withCredentials: true })
			.toPromise()
			.then(res => this.handleResponse(name, res))
			.catch(err => {
				return this.sql.getJson(name).then(data => {
					if (data) {
						console.log(`Retrieved ${data.length} entries for ${name} from local storage`);
						return data;
					}
					else {
						this.handleError(err, name);
					}
				});
			});
	}

	getOne(name: string, api?: string): Promise<any> {
		if (typeof api === "undefined") { api = "api"; }     // Use the old WebApi by default

		console.log(`Calling ${this.api.apiBase(api)}/${name}}`);
		return this.http.get(`${this.api.apiBase(api)}/${name}`) //, { withCredentials: true })
			.toPromise()
			.then(res => this.handleOne(name, res))
			.catch(err => {
				return this.sql.getJson(name).then(data => {
					if (data) {
						console.log(`Retrieved entry for ${name} from local storage`);
						return data;
					}
					else {
						this.handleError(err, name);
					}
				});
			});
	}

	handleResponse(name: string, res: Response): any[] {
		// Cache Offline
		this.sql.setJson(name, res.json()).then(f => { console.log(name + " saved to sqlstorage") });
		this.events.publish("DataService.Status", true);
		return res.json();
	}

	handleOne(name: string, res: Response): any {
		//Cache Offline
		if (res.status == 204) {
			// return undefined if no data so we don't get error from .json()
			return undefined;
		}
		this.sql.setJson(name, res.json()).then(f => { console.log(`${name} saved to sqlstorage`)});
		this.events.publish("DataService.Status", true);
		return res.json();
	}

	// TODO Implement some fallback to local data

	handleError(err: any, name: string): Promise<any> {
		let msg = `Error occurred while retrieving ${name}: ${err.message || err}`;
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 5000
		});
		toast.present();
		console.log(msg);
		return Promise.reject(err.message || err);
	}
}