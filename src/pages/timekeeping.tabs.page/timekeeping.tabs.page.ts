// Angular/Ionic
import { Component, ViewChild } from "@angular/core";
import { NavParams, Tabs } from "ionic-angular";

// Components
import { TimekeepingDailyPage } from "../timekeeping.daily.page/timekeeping.daily.page";
import { TimekeepingMonthlyPage } from "../timekeeping.monthly.page/timekeeping.monthly.page";
import { TimekeepingWeeklyPage } from "../timekeeping.weekly.page/timekeeping.weekly.page";

// Models
import { ActiveFunction } from "../../models/activeuser";

// Services
import { TimekeepingService } from "../../services/timekeeping.service";
import { UserService } from "../../services/user.service";

@Component({
    templateUrl: 'timekeeping.tabs.page.html'
})
export class TimekeepingTabsPage {
    @ViewChild('timeTabs') tabRef: Tabs;

    constructor(public timeSrv: TimekeepingService, private usrSrv: UserService, public params: NavParams) {
        this.timekeepingDailyPage = TimekeepingDailyPage;
        this.timekeepingWeeklyPage = TimekeepingWeeklyPage;
        this.timekeepingMonthlyPage = TimekeepingMonthlyPage;
    }

    ionViewCanEnter(): boolean {
		return this.usrSrv.currentUser.validFunctions.some(fn => fn == ActiveFunction.Timekeeping);
    }
    
    timekeepingDailyPage: any;
    timekeepingWeeklyPage: any;
    timekeepingMonthlyPage: any;
}