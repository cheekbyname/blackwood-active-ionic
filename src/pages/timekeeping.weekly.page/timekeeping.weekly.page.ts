import { Component, ViewChild } from "@angular/core";
import { NavController, Platform, DateTime } from "ionic-angular";
import { DatePicker } from "ionic-native";
import { Timesheet } from "../../models/timesheet";
import { Locale, LOC_EN } from "../../utils/locale.utils";

import { TimekeepingService } from "../../services/timekeeping.service";
import { DateUtils } from "../../utils/date.utils";
import { TimesheetUtils } from "../../utils/timesheet.utils";

@Component({
    templateUrl: 'timekeeping.weekly.page.html'
})
export class TimekeepingWeeklyPage {

    @ViewChild("datePicker") datePicker : DateTime;

    constructor(public timeSrv: TimekeepingService, private navCtrl: NavController, private platform: Platform) {
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

    prevWeek() {
        this.timeSrv.setDate(DateUtils.adjustDate(this.weekCommencing, -7));
    }

    nextWeek() {
        this.timeSrv.setDate(DateUtils.adjustDate(this.weekCommencing, 7));
    }

    showDatePop(ev: any) {
		if (this.platform.is('cordova')) {
			DatePicker.show({ date: this.weekCommencing, mode: 'date' }).then(dt => {
				this.timeSrv.setDate(DateUtils.getWeekCommencingFromDate(dt));
			})
		} else {
            this.weekCommencing.setHours(1);
			this.datePicker.setValue(this.weekCommencing.toISOString());
			this.datePicker.open();
		}
    }

    dateChanged(ev: any) {
		let data = this.datePicker.getValue();
		this.timeSrv.setDate(new Date(data.year, data.month - 1, data.day, 2));
	}
}