import { Component } from "@angular/core";
import { Platform, FabContainer, ModalController, ModalOptions, NavController } from "ionic-angular";
import { DatePicker } from "ionic-native";

import { AdjustmentPopover } from "../../components/adjustment.popover/adjustment.popover";
import { DateSelectPopover } from "../../components/dateselect.popover/dateselect.popover";

import { TimekeepingService } from "../../services/timekeeping.service";
import { UserService } from "../../services/user.service";
import { DateUtils } from "../../services/utility.service";

import { Adjustment } from "../../models/adjustment";
import { CarerBooking } from "../../models/carerbooking";
import { Shift } from "../../models/shift";
import { Timesheet } from "../../models/timesheet";
import { ActiveFunction } from "../../models/activeuser";

@Component({
	selector: 'timekeeping-page',
	templateUrl: 'timekeeping.page.html'
})
export class TimekeepingPage {
	constructor(private timeSrv: TimekeepingService, public utils: DateUtils, private modCtrl: ModalController,
		private navCtrl: NavController, private platform: Platform, private usrSrv: UserService) {
		this.timeSrv.timesheetObserver.subscribe(ts => {
			if (ts !== undefined) {
				this.timesheet = ts;
				this.displayToday();
			}
		});
	}

	ionViewCanEnter(): boolean {
		return this.usrSrv.currentUser.validFunctions.some(fn => fn == ActiveFunction.Timekeeping);
	}

	today: any = undefined;
	timesheet: Timesheet;
	bookings: CarerBooking[] = [];
	selectedDate: Date = new Date(Date.now());

	prevDay() {
		this.today = undefined;
		this.selectedDate.setDate(this.selectedDate.getDate() - 1);
		this.displayToday();
		this.timeSrv.setDate(this.selectedDate);
	}

	nextDay() {
		this.today = undefined;
		this.selectedDate.setDate(this.selectedDate.getDate() + 1);
		this.displayToday();
		this.timeSrv.setDate(this.selectedDate);
	}

	displayToday() {
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
				this.today = undefined;
				this.selectedDate = dt;
				this.timeSrv.setDate(this.selectedDate);
				this.displayToday();
			})
		} else {
			var dp = this.modCtrl.create(DateSelectPopover);
			dp.present({
				ev: ev
			});
		}
	}

	newAdjust(ev, fab: FabContainer) {
		fab.close();
		let ap = this.modCtrl.create(AdjustmentPopover, { selectedDate: this.selectedDate }, {});
		ap.present();
	}

	openAdjust(adj: Adjustment) {
		let ap = this.modCtrl.create(AdjustmentPopover, { selectedAdjust: adj });
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
