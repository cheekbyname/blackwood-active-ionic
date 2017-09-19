import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { FCM } from "@ionic-native/fcm";

import { HomePage } from '../pages/home.page/home.page';
import { ActivityPage } from '../pages/activity.page/activity.page';
//import { DebugPage } from '../pages/debug.page/debug.page';
import { SettingsPage } from '../pages/settings.page/settings.page';
import { TimekeepingDailyPage } from "../pages/timekeeping.daily.page/timekeeping.daily.page";

import { DebugService } from '../services/debug.service';
import { UserService } from "../services/user.service";

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage = HomePage;
	pages: Array<{ title: string, component: any, icon: string }>;


	constructor(public platform: Platform, public debug: DebugService, public fcm: FCM, public splash: Splashscreen,
		public status: StatusBar, private alert: AlertController, private usrSrv: UserService) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
			this.initFCM();
			this.debug.log("Application initializing");
			this.pages = [
				{ title: 'Home', component: HomePage, icon: 'home' },
				{ title: 'Activity', component: ActivityPage, icon: 'pulse' },
				{ title: 'Timekeeping', component: TimekeepingDailyPage, icon: 'clock' },
				// { title: 'Debug', component: DebugPage, icon: 'bug' },
				{ title: 'Settings', component: SettingsPage, icon: 'cog' }
			];
		});
	}

	initFCM() {
		if (this.platform.is('cordova')) {
			this.fcm.getToken().then((data: any) => {
				this.usrSrv.pushKey(data);
			});

			this.fcm.onTokenRefresh().subscribe(data => {
				this.usrSrv.pushKey(data);
			});

			this.fcm.onNotification().subscribe(note => {
				if (!note.wasTapped) {
					let notify = this.alert.create({
						title: 'Notification',
						message: JSON.stringify(note),
						buttons: [{
							text: 'Ok', handler: () => { }
						}]
					});
					notify.present();
				}
			});
		} else {
			console.warn('Push notifications not initialised: Cordova not available. Please run in physical device.');
		}
	};

	openPage(page) {
		this.nav.setRoot(page.component).catch(err => {
			let soz = this.alert.create({
				title: "Sorry!",
				message: "You are not authorised for this function. If you think you should be, please contact your Team Leader or Business Solutions.",
				buttons: [{
					text: "Ok", handler: () => { }
				}]
			});
			soz.present();
		});
	}
}
