import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import { PushMessage } from "../models/pushmessage";

@Injectable()
export class NotificationService {

    constructor(private alert: AlertController) {

    }

    pushMessages: PushMessage[] = [];
    pushMessages$: BehaviorSubject<PushMessage[]> = new BehaviorSubject<PushMessage[]>(this.pushMessages);
    pushMessageObserver: Observable<PushMessage[]> = this.pushMessages$.asObservable();

    handleIncomingNotification(data: any) {
        // Keep a copy of the data so we can show a message history
        this.pushMessages.push(new PushMessage(data));
        this.pushMessages$.next(this.pushMessages);

        // Show Alert if message was received with app in foreground
        if (!data.wasTapped) {
            let notify = this.alert.create({
                title: data.title,
                message: data.body,
                buttons: this.buttonsFor(data)
            });
            notify.present();
        } else {
            // Navigate if payload contained navigation information
            if (data.navigate != undefined) this.navigateTo(data.navigate, data.param);
        }
    }

    buttonsFor(data: any): any[] {
        let buttons = [];
        if (data.navigate != undefined) {
            buttons.push({ text: 'Show Me', handler: this.navigateTo(data.navigate, data.param) });
        }
        buttons.push({ text: 'Ok', handler: () => { } });
        return buttons;
    }

    navigateTo(dest: string, param: string) {
        // TODO Navigate to the destination component with the specified param
    }
}