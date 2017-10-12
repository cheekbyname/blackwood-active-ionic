import { DateUtils } from "./date.utils";

import { Timesheet } from "../models/timesheet";
import { Shift } from "../models/shift";
import { Adjustment } from "../models/adjustment";

export module TimesheetUtils {
	export function shiftsForDay(ts: Timesheet, dt: Date): Shift[] {
		if (ts == undefined) return [];
		return ts.shifts
			.filter(sh => new Date(sh.start).getDate() == dt.getDate());
	}

	export function shiftTimeForDay(ts: Timesheet, dt: Date): number {
		return shiftsForDay(ts, dt)
			.map(sh => { return sh.shiftMins - sh.unpaidMins })
			.reduce((acc, cur) => { return acc + cur }, 0);
	}

	export function totalTimeForDay(ts: Timesheet, dt: Date): number {
		return shiftTimeForDay(ts, dt) + adjustTimeForDay(ts, dt);
	}

	export function adjustmentsForDay(ts: Timesheet, dt: Date): Adjustment[] {
		if (ts == undefined) return [];
		return ts.adjustments
			.filter(adj => DateUtils.adjustDate(ts.weekCommencing, adj.dayOffset).getDate() == dt.getDate());
	}

	export function adjustTimeForDay(ts: Timesheet, dt: Date): number {
		return adjustmentsForDay(ts, dt)
			.filter(adj => adj.rejected == null)
			.map(adj => { return (adj.hours * 60) + adj.mins; })
			.reduce((acc, cur) => { return acc + cur }, 0);
	}

	export function totalTimeForSheet(ts: Timesheet): number {
		let shiftTime = shiftTimeForSheet(ts);
		let leaveTime = paidLeaveTimeForSheet(ts);
		let sickTime = sickLeaveTimeForSheet(ts);

		let adjustTime = ts.adjustments
			.filter(adj => adj.rejected == null)
			.map(adj => { return (adj.hours * 60) + adj.mins; })
			.reduce((acc, cur) => { return acc + cur}, 0);

		return shiftTime + leaveTime + sickTime + adjustTime;
	}

	export function shiftTimeForSheet(ts: Timesheet): number {
		return ts.shifts.map(sh => sh.shiftMins).reduce((acc, cur) => { return acc + cur }, 0);
	}

	export function paidLeaveTimeForSheet(ts: Timesheet): number {
		return ts.bookings.filter(bk => bk.bookingType == 108).map(bk => bk.thisMins).reduce((acc, cur) => { return acc + cur }, 0);
	}

	export function sickLeaveTimeForSheet(ts: Timesheet): number {
		return ts.bookings.filter(bk => bk.bookingType == 109).map(bk => bk.thisMins).reduce((acc, cur) => { return acc + cur}, 0);
	}

	export function unpaidLeaveTimeForSheet(ts: Timesheet): number {
		return ts.bookings.filter(bk => bk.bookingType == 110).map(bk => bk.thisMins).reduce((acc, cur) => { return acc + cur }, 0);
	}
}