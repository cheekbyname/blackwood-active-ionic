import { Component } from "@angular/core";

import { TimekeepingService } from "../../services/timekeeping.service";

import { Timesheet } from "../../models/timesheet";

@Component({
	selector: 'timekeeping-page',
	templateUrl: 'timekeeping.page.html'
})
export class TimekeepingPage {
	constructor(private timeSrv: TimekeepingService) {
		this.timeSrv.timesheetObserver.subscribe(ts => this.timesheet = ts);
	}

	timesheet: Timesheet;
	selectedDate: Date = new Date(Date.now());
}