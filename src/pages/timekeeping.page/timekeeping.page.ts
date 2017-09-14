import { Component } from "@angular/core";
import { Platform, FabContainer, ModalController, ModalOptions } from "ionic-angular";
import { DatePicker } from "ionic-native";

import { AdjustmentPopover } from "../../components/adjustment.popover/adjustment.popover";
import { DateSelectPopover } from "../../components/dateselect.popover/dateselect.popover";

import { TimekeepingService } from "../../services/timekeeping.service";
import { DateUtils } from "../../services/utility.service";

import { Adjustment } from "../../models/adjustment";
import { CarerBooking } from "../../models/carerbooking";
import { Shift } from "../../models/shift";
import { Timesheet } from "../../models/timesheet";

@Component({
	selector: 'timekeeping-page',
	templateUrl: 'timekeeping.page.html'
})
export class TimekeepingPage {
	constructor(private timeSrv: TimekeepingService, public utils: DateUtils, private modCtrl: ModalController,
		private platform: Platform) {
		this.timeSrv.timesheetObserver.subscribe(ts => {
			if (ts !== undefined) {
				this.timesheet = ts;
				this.theDayToday();
			}
		});
	}

	today: any = undefined;
	timesheet: Timesheet;
	bookings: CarerBooking[] = [];
	selectedDate: Date = new Date(Date.now());

	prevDay() {
		this.today = undefined;
		this.selectedDate.setDate(this.selectedDate.getDate() - 1);
		this.theDayToday();
		this.timeSrv.setDate(this.selectedDate);
	}

	nextDay() {
		this.today = undefined;
		this.selectedDate.setDate(this.selectedDate.getDate() + 1);
		this.theDayToday();
		this.timeSrv.setDate(this.selectedDate);
	}

	theDayToday() {
		this.today = {};
		this.today.shifts = this.timesheet.shifts.filter(sh =>
			new Date(sh.start).getDate() == this.selectedDate.getDate());
		this.today.shifts.forEach(shift => {
			shift.bookings = this.filterByShift(shift, this.timesheet.bookings);
			shift.visible = false;
		});
		this.today.adjustVisible = false;
		this.today.adjustments = this.timesheet.adjustments.filter(adj => {
			let dt = new Date(adj.weekCommencing);
			dt.setDate(dt.getDate() + adj.dayOffset);
			return dt.getDate() == this.selectedDate.getDate();
		});

		this.today.totalTime = this.today.shifts.map(sh => { return sh.shiftMins - sh.unpaidMins }).reduce((acc, cur) => { return acc + cur }, 0);
		if (this.timesheet.adjustments.length > 0) {
			this.today.totalAdjust = this.today.adjustments.map(adj => { return { hours: adj.hours, mins: adj.mins }; })
				.reduce((acc, cur: {hours: number, mins: number} ) =>
					{ return { hours: acc.hours + cur.hours, mins: acc.mins + cur.mins } }, {hours: 0, mins: 0 });
		}
	}

	filterByShift(shift: Shift, bookings: CarerBooking[]): CarerBooking[] {
		return bookings.filter(bk => new Date(bk.thisStart).getDate() == this.selectedDate.getDate() && shift.sequence == bk.shift);
	}

	bookColor(bk: CarerBooking) {
		return bk.forename == undefined ? 'pink' : 'white';
	}

	doRefresh(refresher) {
		// TODO Store & Restore component visibility settings
		this.timeSrv.refresh().then(x => refresher.complete());
	}

	showDatePop(ev: any) {
		if (this.platform.is('cordova')) {
			DatePicker.show({ date: this.selectedDate, mode: 'date' }).then(dt => {
				this.selectedDate = dt;
				this.timeSrv.setDate(this.selectedDate);
			})
		} else {
			var dp = this.modCtrl.create(DateSelectPopover);
			dp.present({
				ev: ev
			});
		}
	}

	requestAdjustment(ev, fab: FabContainer) {
		fab.close();
		var ap = this.modCtrl.create(AdjustmentPopover, { selectedDate: this.selectedDate }, {});
		ap.present();
	}

	adjStatusColor(adj: Adjustment) {
		if (adj.rejected) return 'red';
		if (adj.authorised) return 'green';
		return 'blue';
	}

	toggleShift(seq: number) {
		this.today.shifts[seq - 1].visible = !this.today.shifts[seq - 1].visible;
	}

	toggleAdjust() {
		this.today.adjustVisible = !this.today.adjustVisible;
	}
}
