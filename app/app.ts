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

// Primary Pages
import { HomePage } from './pages/homepage/homepage';
import { ActivityPage } from './pages/activitypage/activitypage';
import { DebugPage } from './pages/debugpage/debugpage';
import { SettingsPage } from './pages/settingspage/settingspage';
// import { LoginPage } from './pages/login.page/login.page';

declare var Microsoft: any;

@Component({
  templateUrl: 'build/app.html',
  providers: [ Auth, Api, WebApi, PropertyService, DevelopmentService, TenancyService,
    MemberService, CommService, FacilityService, ClientService, UserService, CareActivityService ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public auth: Auth, public propertyService: PropertyService,
    public developmentService: DevelopmentService, public tenancyService: TenancyService,
    public memberService: MemberService, public commService: CommService, public facilityService: FacilityService,
    public clientService: ClientService, public userService: UserService ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home" },
      { title: 'Activity', component: ActivityPage, icon: "pulse" },
      { title: 'Debug', component: DebugPage, icon: "bug" },
      { title: 'Settings', component: SettingsPage, icon: "cog" }
      // { title: 'Login', component: LoginPage, icon: "log-in" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Application initializing");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // })

      this.getUserAcct()
        .then(acct => {
          console.log(`Found Exchange Account: ${JSON.stringify(acct)}`);
          return acct[0].name;
        })
      //   .then(user => { this.authenticate(user, result => {
      //       console.log(JSON.stringify(result));
      //       var authContext = new Microsoft.ADAL.AuthenticationContext(this.auth.authority);
      //       authContext.tokenCache.readItems().then(tokens => {
      //         if (tokens.length > 0) {
      //           console.log(`Have a token: ${JSON.stringify(tokens[0])}`);
      //         } else {
      //           console.log('No tokens');
      //         }
      //       })
      //     })
        });
    }

    // Get device User via accounts plugin
    getUserAcct(): Promise<any> {
      return DeviceAccounts.getByType("com.android.exchange");
    };

  // Authenticate using ADAL plugin
  authenticate(user: string, authCallback: Function) {
      var authContext = new Microsoft.ADAL.AuthenticationContext(this.auth.authority);
      // See if we have an existing token
      authContext.tokenCache.readItems().then(tokens => {
        if (tokens.length > 0) {
          this.auth.authority = tokens[0].authority;
          authContext = new Microsoft.ADAL.AuthenticationContext(this.auth.authority);
        }
        // Attempt to authenticate silently
        console.log(`Acquiring token from ${this.auth.authority} for ${user}`);
        authContext.acquireTokenSilentAsync(this.auth.resourceUrl, this.auth.clientId, user)
          .then(authCallback, result => {
            // Credentials required
            authContext.acquireTokenAsync(this.auth.resourceUrl, this.auth.clientId,
              this.auth.redirectUri, user)
              .then(response => {
                console.log(`Token acquired: ${response.accessToken}`);
                console.log(`Token expires: ${response.expiresOn}`);
                return authCallback;
              }, err => {
                console.log(`Failed to authenticate: ${err}`);
              })
          })
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
