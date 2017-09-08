import { Component } from "@angular/core";

import { TimekeepingService } from "../../services/timekeeping.service";
import { DateUtils } from "../../services/utility.service";

import { CarerBooking } from "../../models/carerbooking";
import { Shift } from "../../models/shift";
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
				this.theDayToday();
			}
		});
	}

	today: any = {};
	timesheet: Timesheet;
	bookings: CarerBooking[] = [];
	selectedDate: Date = new Date(Date.now());

	prevDay() {
		this.selectedDate.setDate(this.selectedDate.getDate() - 1);
		this.theDayToday();
		this.timeSrv.setDate(this.selectedDate);
	}

	nextDay() {
		this.selectedDate.setDate(this.selectedDate.getDate() + 1);
		this.theDayToday();
		this.timeSrv.setDate(this.selectedDate);
	}

	theDayToday() {
		this.today.shifts = this.timesheet.shifts.filter(sh =>
			new Date(sh.start).getDate() == this.selectedDate.getDate());
		this.today.shifts.forEach(shift => {
			shift.bookings = this.filterByShift(shift, this.timesheet.bookings);
		});
	}

	filterByShift(shift: Shift, bookings: CarerBooking[]): CarerBooking[] {
		return bookings.filter(bk => new Date(bk.thisStart).getDate() == this.selectedDate.getDate() && shift.sequence == bk.shift);
	}

	bookColor(bk: CarerBooking) {
        return bk.forename == undefined ? 'silver' : 'white';
	}
	
	doRefresh(refresher) {
		setTimeout(x => refresher.complete(), 2000);
	}
}