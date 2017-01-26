// Angular/Ionic
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite } from 'ionic-native';


// App
import { MyApp } from './app.component';

// Pages
import { ActivityPage } from '../pages/activity.page/activity.page';
import { AddDailyNotePage } from '../pages/adddailynote.page/adddailynote.page';
import { AssessCheckPage } from '../pages/assesscheck.page/assesscheck.page';
import { AssessTabsPage } from '../pages/assesstabs.page/assesstabs.page';
import { CareNeedPage } from '../pages/careneed.page/careneed.page';
import { CarePlanPage } from '../pages/careplan.page/careplan.page';
import { CareSummaryPage } from '../pages/caresummary.page/caresummary.page';
import { ClientPage } from '../pages/client.page/client.page';
import { ClientSearchPage } from '../pages/client.search.page/client.search.page';
import { } from '../pages/clientdetails.page/clientdetails.page';
import { DailyNotesPage } from '../pages/dailynotes.page/dailynotes.page';
import { DebugPage } from '../pages/debug.page/debug.page';
import { DevelopmentListPage } from '../pages/development.list.page/development.list.page';
import { DevelopmentPage } from '../pages/development.page/development.page';
import { DevelopmentTabsPage } from '../pages/development.tabs.page/development.tabs.page';
import { FacilityPage } from '../pages/facility.page/facility.page';
import { FacilitySearchPage } from '../pages/facility.search.page/facility.search.page';
import { HandlingPage } from '../pages/handling.page/handling.page';
import { HomePage } from '../pages/home.page/home.page';
import { InitialAssessPage } from '../pages/initialassess.page/initialassess.page';
import { PropertyListPage } from '../pages/property.list.page/property.list.page';
import { PropertyPage } from '../pages/property.page/property.page';
import { SettingsPage } from '../pages/settings.page/settings.page';
import { TenancyTabsPage } from '../pages/tenancy.tabs.page/tenancy.tabs.page';
import { TenancyCommsPage } from '../pages/tenancy.comms.page/tenancy.comms.page';
import { TenancyListPage } from '../pages/tenancy.list.page/tenancy.list.page';
import { TenancyMembersPage } from '../pages/tenancy.members.page/tenancy.members.page';
import { TenancySearchPage } from '../pages/tenancy.search.page/tenancy.search.page';
import { TilePage } from '../pages/tile.page/tile.page';

// Services
import { Api } from '../services/secret.service';
import { WebApi } from '../services/api.service';
import { CareActivityService } from '../services/care.activity.service';
import { ClientService } from '../services/client.service';
import { CommService } from '../services/comm.service';
import { DebugService} from '../services/debug.service';
import { DevelopmentService } from '../services/development.service';
import { FacilityService } from '../services/facility.service';
import { MemberService } from '../services/member.service';
import { PropertyService } from '../services/property.service';
import { Auth } from '../services/secret.service';
import { TenancyService } from '../services/tenancy.service';
import { UserService } from '../services/user.service';
import { Sql } from '../services/sql.service';
import { SearchService } from '../services/search.service';

// Components
import { ClientCard } from '../components/client.card/client.card';
import { CommCard } from '../components/comm.card/comm.card';
import { DevelopmentCard } from '../components/development.card/development.card';
import { FacilityCard } from '../components/facility.card/facility.card';
import { HomeFilterPopover } from '../components/homefilter.popover/homefilter.popover';
import { MemberCard } from '../components/member.card/member.card';
import { NewActivityPopover } from '../components/newactivity.popover/newactivity.popover';
import { PropertyCard } from '../components/property.card/property.card';
import { SearchBar } from '../components/searchbar/searchbar';
import { TenancyCard } from '../components/tenancy.card/tenancy.card';

@NgModule({
  declarations: [ MyApp, ActivityPage, AddDailyNotePage, AssessCheckPage, AssessTabsPage, CareNeedPage, CarePlanPage, CareSummaryPage,
    ClientPage, ClientSearchPage, DailyNotesPage, DebugPage, DevelopmentPage, DevelopmentTabsPage, FacilityCard, FacilityPage,
    FacilitySearchPage, HandlingPage, HomePage, InitialAssessPage, PropertyPage, PropertyListPage, SettingsPage, TenancyCommsPage,
    TenancyListPage, TenancyMembersPage, TenancySearchPage, TenancyTabsPage, TilePage, ClientCard, CommCard, DevelopmentCard,
    DevelopmentListPage, FacilityCard, HomeFilterPopover, MemberCard, NewActivityPopover, PropertyCard, SearchBar, TenancyCard ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [ MyApp, ActivityPage, AddDailyNotePage, AssessCheckPage, AssessTabsPage, CareNeedPage, CarePlanPage, CareSummaryPage,
    ClientPage, ClientSearchPage, DailyNotesPage, DebugPage, DevelopmentPage, DevelopmentListPage, DevelopmentTabsPage, FacilityPage,
    FacilitySearchPage, HandlingPage, HomePage, InitialAssessPage, PropertyPage, PropertyListPage, SettingsPage, TenancyCommsPage,
    TenancyListPage, TenancyMembersPage, TenancySearchPage, TenancyTabsPage, TilePage ],
  providers: [ { provide: ErrorHandler, useClass: IonicErrorHandler}, Api, WebApi, CareActivityService, ClientService, CommService, DebugService,
    DevelopmentService, FacilityService, MemberService, PropertyService, Auth, TenancyService, UserService, SQLite, Storage, Sql, SearchService ]
})
export class AppModule {}