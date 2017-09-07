import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import { Timesheet } from "../models/timesheet";
import { ActiveUser } from "../models/activeuser";

import { UserService } from "./user.service";
import { DateUtils } from "./utility.service";
import { WebApi } from "./api.service";

@Injectable()
export class TimekeepingService {
	constructor(private usrSrv: UserService, private apiSrv: WebApi, private utils: DateUtils) {
		Observable.combineLatest(this.usrSrv.userObserver, this.weekCommencingObserver,
			(u, w) => {
				return { "user": u, "week": w }
			})
			.subscribe(x => {
				this.getTimesheet(x.user, x.week);
			});
	}

	private timesheet$: BehaviorSubject<Timesheet> = new BehaviorSubject<Timesheet>(undefined);
	private selectedDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date(Date.now()));
	private weekCommencing$: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.utils.getWeekCommencingFromDate(new Date(Date.now())));
	public timesheetObserver: Observable<Timesheet> = this.timesheet$.asObservable();
	public selectedDateObserver: Observable<Date> = this.selectedDate$.asObservable();
	public weekCommencingObserver: Observable<Date> = this.weekCommencing$.asObservable().distinctUntilChanged((a, b) => {
		return this.utils.sqlDate(a) == this.utils.sqlDate(b);
	});

	setDate(dt: Date) {
		this.selectedDate$.next(dt);
		this.weekCommencing$.next(this.utils.getWeekCommencingFromDate(dt));
	}

	getTimesheet(user: ActiveUser, weekCommencing: Date) {
		var url = `timekeeping/timesheet?user=${user.accountName}&weekCommencing=${this.utils.sqlDate(weekCommencing)}`;
		this.apiSrv.getOne(url).then(ts => {
			this.timesheet$.next(ts);
		}).catch((err) => {
			// This is a guard for promise rejected for error
		});
	}
}