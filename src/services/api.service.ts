// Angular/Ionic
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

// Services
import { Api } from './secret.service';
import { DebugService } from './debug.service';

@Injectable()
export class WebApi {
	constructor(private http: Http, private toastCtrl: ToastController, private api: Api,
		public events: Events, public debug: DebugService) {
		this.sql = new Storage();
	}

	callTimeout: number = 20000;
	sql: Storage;
	status: number = 0;
	public readonly statusTypes = [
		{ title: "Connected", desc: "Data service is connected and working.", color: "green" },
		{ title: "Disconnected", desc: "Data service is disconnected. Working from local data. Some functions may not be available.", color: "blue" },
		{ title: "Failed", desc: "Data service is disconnected. Local data not available for the requested function.", color: "red" }
	];

	getAll(name: string, api?: string): Promise<any[]> {
		if (typeof api === "undefined") { api = "api"; }     // Use the new API by default

		console.log(`Calling ${this.api.apiBase(api)}/${name}`);
		return this.http.get(`${this.api.apiBase(api)}/${name}`) //, { withCredentials: true })
			.timeout(this.callTimeout)
			.toPromise()
			.then(res => this.handleResponse(name, res))
			.catch(err => {
				// TODO Still want to log/toast/whatever the error rather than just swallow it
				return this.sql.get(name).then(data => {
					if (data) {
						this.debug.log(`Retrieved ${data.length} entries for ${name} from local storage`);
						this.status = 1;
						return data;
					}
					else {
						return this.handleError(err, name);
					}
				});
			});
	}

	getOne(name: string, api?: string): Promise<any> {
		if (typeof api === "undefined") { api = "api"; }     // Use the old WebApi by default

		console.log(`Calling ${this.api.apiBase(api)}/${name}`);
		return this.http.get(`${this.api.apiBase(api)}/${name}`) //, { withCredentials: true })
			.timeout(this.callTimeout)
			.toPromise()
			.then(res => this.handleOne(name, res))
			.catch(err => {
				// TODO Still want to log/toast/whatever the error rather than just swallow it
				return this.sql.get(name).then(data => {
					if (data) {
						this.debug.log(`Retrieved entry for ${name} from local storage`);
						this.status = 1;
						return data;
					}
					else {
						return this.handleError(err, name);
					}
				});
			});
	}

	putOne(name: string, thing: Object): Promise<Response> {
		var Url = `${this.api.apiBase('api')}/${name}`;
		console.log(`Calling ${Url}`);
		return this.http.put(Url, thing).toPromise()
			.catch(err => {
				let msg = `Error occurred calling ${name}: ${err.message || err}`;
				let toast = this.toastCtrl.create({ message: msg, duration: 5000 });
				toast.present();
			});
		// TODO Update thing so that any persistence key is correctly recorded
	}

	handleResponse(name: string, res: Response): any[] {
		this.status = 0;
		// Cache Offline
		this.sql.set(name, res.json()).then(f => { console.log(name + " saved to sqlstorage") });
		this.debug.log(`Retrieved ${res.json().length} ${name} from server and saved to sqlstorage`);
		this.events.publish("DataService.Status", true);
		return res.json();
	}

	handleOne(name: string, res: Response): any {
		this.status = 0;
		//Cache Offline
		if (res.status == 204) {
			// return undefined if no data so we don't get error from .json()
			return undefined;
		}
		this.sql.set(name, res.json()).then(f => { console.log(`${name} saved to sqlstorage`) });
		this.events.publish("DataService.Status", true);
		return res.json();
	}

	// TODO Implement some fallback to local data

	handleError(err: any, name: string): Promise<any> {
		this.status = 2;
		let msg = `Error occurred while retrieving ${name}: ${err.message || err}`;
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 5000
		});
		toast.present();
		console.error(msg);
		return Promise.reject(err.message || err);
	}

	getJSON(fileName: string): Promise<any> {
		return this.http.get(fileName).toPromise();
	}
}