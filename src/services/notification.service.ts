import { Injectable } from "@angular/core";

import { AlertController } from "ionic-angular";

@Injectable()
export class NotificationService {

    constructor(private alert: AlertController) {

    }
    
    handleIncomingNotification(data: any) {
        if (!data.wasTapped) {
            let notify = this.alert.create({
                title: data.title,
                message: data.body,
                buttons: [{
                    text: 'Ok', handler: () => { }
                }]
            });
            notify.present();
        }
    }
}