// Angular/Ionic
import { Injectable, ViewChild } from "@angular/core";
import { AlertController, Platform, Nav } from "ionic-angular";
import { Observable, BehaviorSubject } from "rxjs/Rx";

// Models
import { PushMessage } from "../models/pushmessage";

// Navigation Destination Components
import { HomePage } from "../pages/home.page/home.page";
import { TimekeepingTabsPage } from "../pages/timekeeping.tabs.page/timekeeping.tabs.page";

@Injectable()
export class NotificationService {
	@ViewChild(Nav) nav: Nav;
    
    constructor(private alert: AlertController, private platform: Platform) {
        if (!this.platform.is('cordova')) {
            this.pushMessages.push(this.testMsg);
        }
    }

    testMsg: PushMessage = new PushMessage({
        title: "Default Test Message",
        body: "This is a test message. If you're seeing this in Production, Alex is an idiot" });

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
        // Navigate to the destination component with the specified param
        switch (dest) {
            case "HomePage":
                this.nav.setRoot(HomePage);
                break;
            case "TimekeepingDailyPage":
                this.nav.setRoot(TimekeepingTabsPage, { "navparam": param });
                break;
        }
    }
}