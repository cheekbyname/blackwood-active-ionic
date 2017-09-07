import { Component } from "@angular/core";

import { TimekeepingService } from "../../services/timekeeping.service";
import { DateUtils } from "../../services/utility.service";

import { CarerBooking } from "../../models/carerbooking";
import { Timesheet } from "../../models/timesheet";

@Component({
	selector: 'timekeeping-page',
	templateUrl: 'timekeeping.page.html'
})
export class TimekeepingPage {
	constructor(private timeSrv: TimekeepingService, public utils: DateUtils) {
		this.timeSrv.timesheetObserver.subscribe(ts => {
			if (ts !== undefined) {
				this.timesheet = ts;
				this.bookings = this.filterByDay(ts.bookings);
			}
		});
	}

	timesheet: Timesheet;
	bookings: CarerBooking[] = [];
	selectedDate: Date = new Date(Date.now());

	prevDay() {
		this.selectedDate.setDate(this.selectedDate.getDate() - 1);
		this.bookings = this.filterByDay(this.timesheet.bookings);
		this.timeSrv.setDate(this.selectedDate);
	}

	nextDay() {
		this.selectedDate.setDate(this.selectedDate.getDate() + 1);
		this.bookings = this.filterByDay(this.timesheet.bookings);
		this.timeSrv.setDate(this.selectedDate);
	}

	filterByDay(bookings: CarerBooking[]): CarerBooking[] {
		return bookings.filter(bk => new Date(bk.thisStart).getDate() == this.selectedDate.getDate());
	}
}