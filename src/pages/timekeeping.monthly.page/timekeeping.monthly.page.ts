import { Component } from "@angular/core";

import { TimekeepingService } from "../../services/timekeeping.service";
import { DateUtils } from "../../utils/date.utils";

@Component({
    templateUrl: "timekeeping.monthly.page.html"
})
export class TimekeepingMonthlyPage {

    DateUtils = DateUtils;

    selectedDate: Date;

    constructor(public timeSrv: TimekeepingService) {
        timeSrv.selectedDateObserver.subscribe(dt => {
            this.selectedDate = dt;
        });
    }
}