import { Component } from "@angular/core";
import { Platform, PopoverController, PopoverOptions, FabContainer } from "ionic-angular";
import { DatePicker } from "ionic-native";

import { AdjustmentPopover } from "../../components/adjustment.popover/adjustment.popover";
import { DateSelectPopover } from "../../components/dateselect.popover/dateselect.popover";

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
	constructor(private timeSrv: TimekeepingService, public utils: DateUtils, private popCtrl: PopoverController,
		private platform: Platform) {
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
		this.today.totalTime = this.today.shifts.map(sh => { return sh.shiftMins }).reduce((acc, cur) => { return acc + cur }, 0);
	}

	filterByShift(shift: Shift, bookings: CarerBooking[]): CarerBooking[] {
		return bookings.filter(bk => new Date(bk.thisStart).getDate() == this.selectedDate.getDate() && shift.sequence == bk.shift);
	}

	bookColor(bk: CarerBooking) {
		return bk.forename == undefined ? 'pink' : 'white';
	}

	doRefresh(refresher) {
		this.timeSrv.refresh().then(x => refresher.complete());
	}

	showDatePop(ev: any) {
		if (this.platform.is('cordova')) {
			DatePicker.show({ date: this.selectedDate, mode: 'date' }).then(dt => {
				this.selectedDate = dt;
				this.timeSrv.setDate(this.selectedDate);
			})
		} else {
			var dp = this.popCtrl.create(DateSelectPopover);
			dp.present({
				ev: ev
			});
		}
	}

	requestAdjustment(ev, fab: FabContainer) {
		fab.close();
		var ap = this.popCtrl.create(AdjustmentPopover, {}, { cssClass: 'adjustment-popover', enableBackdropDismiss: false });
		ap.present();
	}
}
