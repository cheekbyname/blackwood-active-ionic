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
            this.pushMessages.push(new PushMessage(this.testMsg));
            this.pushMessages.push(new PushMessage(this.navTestMsg));
        }

        //Observable.timer(5000, 10000).subscribe(t => { this.handleIncomingNotification(this.navTestMsg) });
    }

    testMsg = {
        title: "Default Test Message",
        body: "This is a test message. If you're seeing this in Production, Alex is an idiot"
    };

    navTestMsg = {
        title: "Navigation Test",
        body: "Dummy push notification to test Timekeeping and other navigation",
        navigate: "TimekeepingTabsPage",
        param: "2017-09-13"
    };

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
            if (msg.navigate != undefined) this.navigateTo(msg.navigate, msg.param);
        }
    }

    buttonsFor(msg: any): any[] {
        let buttons = [];
        if (msg.navigate != undefined) {
            buttons.push({ text: 'Show Me', handler: () => { this.navigateTo(msg.navigate, msg.param) }});
        }
        buttons.push({ text: 'Ok', handler: () => { } });
        return buttons;
    }

    navigateTo(dest: string, param: string) {
        // TODO Trap for component already being nav root
        // this.app.getRootNav().first().component.name;
        // Navigate to the destination component with the specified param
        switch (dest) {
            case "HomePage":
                this.app.getRootNav().setRoot(HomePage);
                break;
            case "TimekeepingTabsPage":
                this.app.getRootNav().setRoot(TimekeepingTabsPage, { "param": param });
                break;
            default:
                this.alert.create({
                    title: 'Page Not Found',
                    message: 'The page that this notification is trying to take you to cannot be reached. ' 
                    + 'You may need to update your copy of the Blackwood Active application through the Google Play Store for work. '
                    + 'If you have any questions, please contact Business Solutions.',
                    buttons: [{ text: 'Ok', handler: () => { } }]
                }).present();
        }
    }

    showAlert(msg: any) {
        let notify = this.alert.create({
            title: msg.title,
            message: msg.body,
            // message: JSON.stringify(msg),
            buttons: this.buttonsFor(msg)
        });
        notify.present();
    }
}