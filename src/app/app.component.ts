import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Push, PushObject, PushOptions } from "@ionic-native/push";

import { HomePage } from '../pages/home.page/home.page';
import { ActivityPage } from '../pages/activity.page/activity.page';
import { DebugPage } from '../pages/debug.page/debug.page';
import { SettingsPage } from '../pages/settings.page/settings.page';
import { TimekeepingPage } from "../pages/timekeeping.page/timekeeping.page";

import { DebugService } from '../services/debug.service';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage = HomePage;
	pages: Array<{ title: string, component: any, icon: string }>;


	constructor(public platform: Platform, public debug: DebugService, public push: Push, public splash: Splashscreen,
		public status: StatusBar) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
			this.debug.log("Application initializing");
			this.initPushNotifications();
			this.pages = [
				{ title: 'Home', component: HomePage, icon: 'home' },
				{ title: 'Activity', component: ActivityPage, icon: 'pulse' },
				{ title: 'Timekeeping', component: TimekeepingPage, icon: 'clock' },
				{ title: 'Debug', component: DebugPage, icon: 'bug' },
				{ title: 'Settings', component: SettingsPage, icon: 'cog' }
			];
		});
	}

	initPushNotifications() {
		if (!this.platform.is('cordova')) {
			console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
			return;
		}
		const options: PushOptions = {
			android: {
				senderID: ''
			},
			ios: {},
			windows: {
			}
		};
		const pushObject: PushObject = this.push.init(options);

		pushObject.on('registration').subscribe(data => {
			console.log('device token -> ' + data.registrationId);
		});

		pushObject.on('notification').subscribe(data => {
			console.log('Message -> ' + data.message);
		});

		pushObject.on('error').subscribe(error => console.error('Error in Push Plugin -> ' + error));
	};

	openPage(page) {
		this.nav.setRoot(page.component);
	}
}
