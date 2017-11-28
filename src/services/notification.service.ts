// Angular/Ionic
import { Injectable, ViewChild } from "@angular/core";
import { AlertController, Platform, App } from "ionic-angular";
import { Observable, BehaviorSubject } from "rxjs/Rx";

// Models
import { PushMessage } from "../models/pushmessage";

// Navigation Destination Components
import { HomePage } from "../pages/home.page/home.page";
import { TimekeepingTabsPage } from "../pages/timekeeping.tabs.page/timekeeping.tabs.page";

@Injectable()
export class NotificationService {

    constructor(private alert: AlertController, private platform: Platform, private app: App) {
        if (!this.platform.is('cordova')) {
            this.pushMessages.push(this.testMsg);
            this.pushMessages.push(this.navMsg);
        }
    }

    testMsg: PushMessage = new PushMessage({
        title: "Default Test Message",
        body: "This is a test message. If you're seeing this in Production, Alex is an idiot"
    });

    navMsg: PushMessage = new PushMessage({
        title: "Navigation Test",
        body: "Dummy push notification to test Timekeeping and other navigation",
        data: {
            navigate: "TimekeepingTabsPage",
            param: "2017-09-26"
        }
    });

    pushMessages: PushMessage[] = [];
    pushMessages$: BehaviorSubject<PushMessage[]> = new BehaviorSubject<PushMessage[]>(this.pushMessages);
    pushMessageObserver: Observable<PushMessage[]> = this.pushMessages$.asObservable();

    handleIncomingNotification(msg: any) {
        // Keep a copy of the data so we can show a message history
        this.pushMessages.push(new PushMessage(msg));
        this.pushMessages$.next(this.pushMessages);

        // Show Alert if message was received with app in foreground
        if (!msg.wasTapped) {
            this.showAlert(msg);
        } else {
            // Navigate if payload contained navigation information
            if (msg.data && msg.data.navigate != undefined) this.navigateTo(msg.data.navigate, msg.data.param);
        }
    }

    buttonsFor(data: any): any[] {
        let buttons = [];
        if (data.navigate != undefined) {
            buttons.push({ text: 'Show Me', handler: () => { this.navigateTo(data.navigate, data.param) }});
        }
        buttons.push({ text: 'Ok', handler: () => { } });
        return buttons;
    }

    navigateTo(dest: string, param: string) {
        // Navigate to the destination component with the specified param
        switch (dest) {
            case "HomePage":
                this.app.getRootNav().setRoot(HomePage);
                break;
            case "TimekeepingTabsPage":
                this.app.getRootNav().setRoot(TimekeepingTabsPage, { "param": param });
                break;
        }
    }

    showAlert(msg: any) {
        let notify = this.alert.create({
            title: msg.title,
            message: msg.body,
            buttons: this.buttonsFor(msg.data || {})
        });
        notify.present();
    }
}