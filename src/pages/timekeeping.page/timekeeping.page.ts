import { Component } from "@angular/core";

import { TimekeepingService } from "../../services/timekeeping.service";
import { DateUtils } from "../../services/utility.service";

import { Timesheet } from "../../models/timesheet";

@Component({
	selector: 'timekeeping-page',
	templateUrl: 'timekeeping.page.html'
})
export class TimekeepingPage {
	constructor(private timeSrv: TimekeepingService, public utils: DateUtils) {
		this.timeSrv.timesheetObserver.subscribe(ts => this.timesheet = ts);
	}

	timesheet: Timesheet;
	selectedDate: Date = new Date(Date.now());

	prevDay() {
		this.selectedDate.setDate(this.selectedDate.getDate() - 1);
		this.timeSrv.setDate(this.selectedDate);
	}

	nextDay() {
		this.selectedDate.setDate(this.selectedDate.getDate() + 1);
		this.timeSrv.setDate(this.selectedDate);
	}
}