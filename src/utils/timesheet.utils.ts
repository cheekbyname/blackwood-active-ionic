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
		let shiftTime = ts.shifts
			.map(sh => { return sh.shiftMins - sh.unpaidMins })
			.reduce((acc, cur) => { return acc + cur }, 0);
		let adjustTime = ts.adjustments
			.filter(adj => adj.rejected == null)
			.map(adj => { return (adj.hours * 60) + adj.mins; })
			.reduce((acc, cur) => { return acc + cur}, 0);
		return shiftTime + adjustTime;
	}
}