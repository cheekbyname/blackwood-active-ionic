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

	sql: Storage;

	getAll(name: string, api?: string): Promise<any[]> {
		if (typeof api === "undefined") { api = "api"; }     // Use the new API by default

		console.log(`Calling ${this.api.apiBase(api)}/${name}`);
		return this.http.get(`${this.api.apiBase(api)}/${name}`) //, { withCredentials: true })
			.timeout(5000, new Error(`Error calling ${this.api.apiBase(api)}/${name}: Timeout exceeded`))
			.toPromise()
			.then(res => this.handleResponse(name, res))
			.catch(err => {
				// TODO Still want to log/toast/whatever the error rather than just swallow it
				return this.sql.get(name).then(data => {
					if (data) {
						this.debug.log(`Retrieved ${data.length} entries for ${name} from local storage`);
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

		console.log(`Calling ${this.api.apiBase(api)}/${name}`);
		return this.http.get(`${this.api.apiBase(api)}/${name}`) //, { withCredentials: true })
			.timeout(5000, new Error(`Error calling ${this.api.apiBase(api)}/${name}: Timeout exceeded`))
			.toPromise()
			.then(res => this.handleOne(name, res))
			.catch(err => {
				// TODO Still want to log/toast/whatever the error rather than just swallow it
				return this.sql.get(name).then(data => {
					if (data) {
						this.debug.log(`Retrieved entry for ${name} from local storage`);
						return data;
					}
					else {
						this.handleError(err, name);
					}
				});
			});
	}

	putOne(name: string, thing: Object): Promise<Response> {
		var Url = `${this.api.apiBase('api')}/${name}`;
		console.log(`Calling ${Url}`);
		return this.http.put(Url, thing).toPromise();
	}

	handleResponse(name: string, res: Response): any[] {
		// Cache Offline
		this.sql.set(name, res.json()).then(f => { console.log(name + " saved to sqlstorage") });
		this.debug.log(`Retrieved ${res.json().length} ${name} from server and saved to sqlstorage`);
		this.events.publish("DataService.Status", true);
		return res.json();
	}

	handleOne(name: string, res: Response): any {
		//Cache Offline
		if (res.status == 204) {
			// return undefined if no data so we don't get error from .json()
			return undefined;
		}
		this.sql.set(name, res.json()).then(f => { console.log(`${name} saved to sqlstorage`)});
		this.events.publish("DataService.Status", true);
		return res.json();
	}

	// TODO Implement some fallback to local data

	handleError(err: any, name: string): Promise<any> {
		let msg = "Error occurred while retrieving ${name}: ${err.message || err}";
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 5000
		});
		toast.present();
		console.log(msg);
		return Promise.reject(err.message || err);
	}

	getJSON(fileName: string): Promise<any> {
		return this.http.get(fileName).toPromise();
	}
}