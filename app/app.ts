import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar, DeviceAccounts } from 'ionic-native';

// Data and Services
import { Auth, Api } from './services/secret.service';
import { WebApi } from './services/api.service';
import { TenancyService } from './services/tenancy.service';
import { DevelopmentService } from './services/development.service';
import { PropertyService } from './services/property.service';
import { MemberService } from './services/member.service';
import { CommService} from './services/comm.service';
import { FacilityService } from './services/facility.service';
import { ClientService } from './services/client.service';
import { UserService } from './services/user.service';
import { CareActivityService } from './services/care.activity.service';
import { DebugService } from './services/debug.service';

// Primary Pages
import { HomePage } from './pages/homepage/homepage';
import { ActivityPage } from './pages/activitypage/activitypage';
import { DebugPage } from './pages/debugpage/debugpage';
import { SettingsPage } from './pages/settingspage/settingspage';

@Component({
  templateUrl: 'build/app.html',
  providers: [ Auth, Api, WebApi, PropertyService, DevelopmentService, TenancyService,
    MemberService, CommService, FacilityService, ClientService, UserService, CareActivityService,
    DebugService ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home" },
      { title: 'Activity', component: ActivityPage, icon: "pulse" },
      { title: 'Debug', component: DebugPage, icon: "bug" },
      { title: 'Settings', component: SettingsPage, icon: "cog" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Application initializing");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // })
      });
    }

    // Get device User via accounts plugin
    // getUserAcct(): Promise<any> {
    //   return DeviceAccounts.getByType("com.android.exchange");
    // };

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
