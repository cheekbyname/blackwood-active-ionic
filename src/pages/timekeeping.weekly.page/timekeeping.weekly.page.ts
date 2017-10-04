import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { Timesheet } from "../../models/timesheet";
import { Locale, LOC_EN } from "../../utils/locale.utils";

import { TimekeepingService } from "../../services/timekeeping.service";
import { DateUtils } from "../../utils/date.utils";
import { TimesheetUtils } from "../../utils/timesheet.utils";

@Component({
    templateUrl: 'timekeeping.weekly.page.html'
})
export class TimekeepingWeeklyPage {
    constructor(public timeSrv: TimekeepingService, private navCtrl: NavController) {
        // Consider moving this into tabs page and binding back in as @Input
		this.timeSrv.timesheetObserver.subscribe(ts => {
			if (ts !== undefined) {
				this.timesheet = ts;
			}
        });
        this.timeSrv.weekCommencingObserver.subscribe(wc => {
            if (wc !== undefined) {
                this.weekCommencing = wc;
            }
        })
    }

    timesheet: Timesheet;
    weekCommencing: Date;
    loc: Locale = LOC_EN;
    DateUtils = DateUtils;
    TimesheetUtils = TimesheetUtils;

    gotoDay(offset: number) {
        this.timeSrv.setDate(DateUtils.adjustDate(this.weekCommencing, offset));
        this.navCtrl.parent.select(0);
    }

    hoursForDay(offset: number): string {
        return DateUtils.displayTime(TimesheetUtils.totalTimeForDay(this.timesheet, DateUtils.adjustDate(this.weekCommencing, offset)));
    }
}