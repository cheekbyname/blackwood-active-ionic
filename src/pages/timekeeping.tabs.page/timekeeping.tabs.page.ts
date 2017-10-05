// Angular/Ionic
import { Component } from "@angular/core";

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
    constructor(public timeSrv: TimekeepingService, private usrSrv: UserService) {
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