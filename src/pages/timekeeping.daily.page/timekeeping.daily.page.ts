import { Component, ViewChild, ViewChildren, QueryList } from "@angular/core";
import { Platform, FabContainer, ModalController, AlertController, DateTime, Content, FabButton, PopoverController,
	NavParams } from "ionic-angular";
import { DatePicker } from "ionic-native";

import { AdjustmentPopover } from "../../components/adjustment.popover/adjustment.popover";
import { BookingDetailPopover } from "../../components/booking.detail.popover/booking.detail.popover";

import { DateUtils } from "../../utils/date.utils";
import { TimekeepingService } from "../../services/timekeeping.service";
import { TimesheetUtils } from "../../utils/timesheet.utils";

import { Adjustment } from "../../models/adjustment";
import { CarerBooking } from "../../models/carerbooking";
import { Shift } from "../../models/shift";
import { Timesheet } from "../../models/timesheet";

@Component({
	selector: 'timekeeping-daily-page',
	templateUrl: 'timekeeping.daily.page.html'
})
export class TimekeepingDailyPage {

	@ViewChild(DateTime) datePicker: DateTime;
	@ViewChild(Content) content: Content;
	@ViewChildren(FabButton) fabs: QueryList<FabButton>;

	constructor(private timeSrv: TimekeepingService, private platform: Platform, private alert: AlertController,
		private modCtrl: ModalController, private popCtrl: PopoverController, private params: NavParams) {
		this.timeSrv.timesheetObserver.subscribe(ts => {
			if (ts !== undefined) {
				this.timesheet = ts;
				this.displayToday();
			}
		});
		this.timeSrv.selectedDateObserver.subscribe(dt => {
			this.selectedDate = dt;
			if (this.timesheet !== undefined) {
				this.displayToday();
			}
		});
		var param = this.params.get("param");
		if (param) {
			this.timeSrv.setDate(new Date(param));
		} else {
			this.timeSrv.setDate(new Date(Date.now()));
		}
	}

	ngAfterViewInit() {
		this.content.enableScrollListener();
	}

	scrollHandler(event) {
		// TODO Need to figure out how to trigger this correctly without a scroll event
		let distanceFromBottom = this.content.scrollHeight - (this.content.contentHeight + this.content.scrollTop);
		if (distanceFromBottom < 67) {
			let opacity = 0.25 + (distanceFromBottom/100);
			this.fabs.map(fab => { fab.setElementStyle("opacity", opacity.toString()) });
		} else {
			this.fabs.map(fab => { fab.setElementStyle("opacity", "1.0") });
		}
	}

	today: any = undefined;
	timesheet: Timesheet;
	bookings: CarerBooking[] = [];
	selectedDate: Date;
	DateUtils = DateUtils;

	prevDay() {
		this.today = undefined;
		this.selectedDate.setDate(this.selectedDate.getDate() - 1);
		this.timeSrv.setDate(this.selectedDate);
	}

	nextDay() {
		this.today = undefined;
		this.selectedDate.setDate(this.selectedDate.getDate() + 1);
		this.timeSrv.setDate(this.selectedDate);
	}

	displayToday() {
		// Reset fab opacity
		if (this.fabs) this.fabs.map(fab => { fab.setElementStyle("opacity", "1.0")});

		this.today = {};
		this.today.shifts = TimesheetUtils.shiftsForDay(this.timesheet, this.selectedDate);
		this.today.shifts.forEach(shift => {
			shift.bookings = this.filterByShift(shift, this.timesheet.bookings);
			shift.visible = false;
		});
		this.today.adjustVisible = false;
		this.today.adjustments = TimesheetUtils.adjustmentsForDay(this.timesheet, this.selectedDate);
		this.today.totalTime = TimesheetUtils.totalTimeForDay(this.timesheet, this.selectedDate);
		let totalAdjustMins = TimesheetUtils.adjustTimeForDay(this.timesheet, this.selectedDate);
		this.today.totalAdjust = { hours: Math.floor(totalAdjustMins / 60), mins: totalAdjustMins % 60 }
	}

	filterByShift(shift: Shift, bookings: CarerBooking[]): CarerBooking[] {
		return bookings.filter(bk => new Date(bk.thisStart).getDate() == this.selectedDate.getDate() && shift.sequence == bk.shift);
	}

	bookColor(bk: CarerBooking) {
		return bk.forename == undefined ? 'pink' : 'white';
	}

	doRefresh(refresher) {
		// TODO Store & Restore component visibility settings
		this.timeSrv.refresh().then(x => {
			refresher.complete();
			this.content.resize();
		});
	}

	showDatePop(ev: any) {
		if (this.platform.is('cordova')) {
			DatePicker.show({ date: this.selectedDate, mode: 'date' }).then(dt => {
				this.today = undefined;
				this.selectedDate = dt;	// TODO Test to see if this is now removable as I suspect
				this.timeSrv.setDate(this.selectedDate);
				this.displayToday();
			})
		} else {
			this.datePicker.setValue(this.selectedDate.toISOString());
			this.datePicker.open();
		}
	}

	dateChanged(ev: any) {
		let data = this.datePicker.getValue();
		this.timeSrv.setDate(new Date(data.year, data.month - 1, data.day, 2));
	}

	showBooking(ev: any, bk : CarerBooking) {
		let pop = this.modCtrl.create(BookingDetailPopover, {
			booking: bk,
			contract: this.timesheet.contracts.find(cn => cn.contractCode == bk.contractCode)
		}, { showBackdrop: false });
		pop.present();
	}

	newAdjust(ev, fab: FabContainer) {
		fab.close();
		let ap = this.modCtrl.create(AdjustmentPopover, { selectedDate: this.selectedDate }, {});
		ap.present();
	}

	openAdjust(adj: Adjustment) {
		let ap = this.modCtrl.create(AdjustmentPopover, { selectedAdjust: adj });
		ap.present().catch(err => {
			let soz = this.alert.create({
				title: "Sorry!",
				message: `This adjustment has already been ${adj.authorised == null ? 'rejected' : 'approved'}. If you believe this is incorrect, please contact your Team Leader.`,
				buttons: [{
					text: "Ok", handler: () => { }
				}]
			});
			soz.present();
		});
	}

	adjStatusColor(adj: Adjustment) {
		if (adj.rejected) return 'red';
		if (adj.authorised) return 'green';
		return 'blue';
	}

	toggleShift(seq: number) {
		this.today.shifts[seq - 1].visible = !this.today.shifts[seq - 1].visible;
		this.content.resize();
	}

	toggleAdjust() {
		this.today.adjustVisible = !this.today.adjustVisible;
		this.content.resize();
	}
}
