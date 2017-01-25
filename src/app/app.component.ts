import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home.page/home.page';
import { ActivityPage } from '../pages/activity.page/activity.page';
import { DebugPage } from '../pages/debug.page/debug.page';
import { SettingsPage } from '../pages/settings.page/settings.page';

import { DebugService } from '../services/debug.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;


  constructor(platform: Platform, public debug: DebugService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.debug.log("Application initializing");
      this.pages = [
        { title: 'Home', component: HomePage, icon: 'home' },
        { title: 'Activity', component: ActivityPage, icon: 'pulse' },
        { title: 'Debug', component: DebugPage, icon: 'bug' },
        { title: 'Settings', component: SettingsPage, icon: 'cog' }
      ];

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
