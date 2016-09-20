import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebApi {
        constructor(private http: Http, private toastCtrl: ToastController) {}

        public baseUrl = "http://MBHOF754/api";        // Currently reliant on iisexpress-proxy
        //baseUrl = "https://MBHOF754/api";
        //baseUrl = "http://localhost:50915/api";
        // baseUrl = "https://localhost:44352/api";

        getAll(name: string): Promise<any[]> {
                return this.http.get(`${this.baseUrl}/${name}`)
                        .toPromise()
                        .then(res=> this.handleResponse(res))
                        .catch(err => this.handleError(err, name));
        }

        handleResponse(res: Response): any[] {
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