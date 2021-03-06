import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, AppVersion } from 'ionic-native';
import { FCM } from "@ionic-native/fcm";

import { ActivityPage } from '../pages/activity.page/activity.page';
import { HomePage } from '../pages/home.page/home.page';
import { SettingsPage } from '../pages/settings.page/settings.page';
import { TimekeepingTabsPage } from "../pages/timekeeping.tabs.page/timekeeping.tabs.page";

import { NotificationService } from "../services/notification.service";
import { UserService } from "../services/user.service";

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage = HomePage;
	pages: Array<{ title: string, component: any, icon: string }>;
	appName: string = "Blackwood Active";
	appVerNum: string ="0.0.0.0";
	appVerCode: string = "0";

	constructor(public platform: Platform, public fcm: FCM, public splash: Splashscreen, private noteSrv: NotificationService,
		public status: StatusBar, private alert: AlertController, private usrSrv: UserService, private appVer: AppVersion) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
			this.initFCM();
			this.pages = [
				{ title: 'Home', component: HomePage, icon: 'home' },
				{ title: 'Activity', component: ActivityPage, icon: 'pulse' },
				{ title: 'Timekeeping', component: TimekeepingTabsPage, icon: 'clock' },
				{ title: 'Settings', component: SettingsPage, icon: 'cog' }
			];
			if (this.platform.is('cordova')) {
				AppVersion.getAppName().then(nm => this.appName = nm);
				AppVersion.getVersionCode().then(vc => this.appVerCode = vc);
				AppVersion.getVersionNumber().then(vn => this.appVerNum = vn);
			}
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

			this.fcm.onNotification().subscribe((data: any) => {
				this.noteSrv.handleIncomingNotification(data);
			});

		} else {
			console.warn('Push notifications not initialised: Cordova not available. Please run in physical device.');
		}
	};

	openPage(page) {
		if (this.usrSrv.currentUser == undefined) {
			let soz = this.alert.create({
				title: "No User Information",
				message: "Your User information is not yet loaded, please wait...",
				buttons: [{
					text: "Ok", handler: () => { }
				}]
			});
			soz.present();
			return;
		}
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
