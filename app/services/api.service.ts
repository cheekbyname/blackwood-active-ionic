import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

import { Api } from './secret.service.ts';

@Injectable()
export class WebApi {
        constructor(private http: Http, private toastCtrl: ToastController, private api: Api ) {}

        // public baseUrl = "http://MBHOF754/api";        // Currently reliant on iisexpress-proxy
        // baseUrl = "http://localhost:50915/api";

        getAll(name: string, api?: string): Promise<any[]> {
                if (typeof api === "undefined") { api = "active"; }     // Use the old WebApi by default

                console.log(`Calling ${this.api.apiBase(api)}/${name}`);
                return this.http.get(`${this.api.apiBase(api)}/${name}`)
                        .toPromise()
                        .then(res=> this.handleResponse(name, res))
                        .catch(err => this.handleError(err, name));
        }

        getOne(name: string, api?: string): Promise<any> {
                if (typeof api === "undefined") { api = "active"; }     // Use the old WebApi by default

                console.log(`Calling ${this.api.apiBase(api)}/${name}}`);
                return this.http.get(`${this.api.apiBase(api)}/${name}`)
                        .toPromise()
                        .then(res => this.handleOne(name, res))
                        .catch(err => this.handleError(err, name));
        }

        handleResponse(name: string, res: Response): any[] {
                console.log(`Returned ${res.status} ${res.statusText} `);
                //console.log(`Retrieved ${res.json.length} ${name}`);
                return res.json();
        }

        handleOne(name: string, res: Response): any {
                console.log(`Returned ${res.status} ${res.statusText}`);
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