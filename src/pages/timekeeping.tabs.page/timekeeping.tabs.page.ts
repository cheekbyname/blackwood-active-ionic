// Angular/Ionic
import { Component } from "@angular/core";

// Components
import { TimekeepingDailyPage } from "../timekeeping.daily.page/timekeeping.daily.page";

// Services
import { TimekeepingService } from "../../services/timekeeping.service";

@Component({
    templateUrl: 'timekeeping.tabs.page.html'
})
export class TimekeepingTabsPage {
    constructor(public timeSrv: TimekeepingService) {
        this.timekeepingDailyPage = TimekeepingDailyPage;
    }

    timekeepingDailyPage: any;
}