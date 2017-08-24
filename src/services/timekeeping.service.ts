import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import { Timesheet } from "../models/timesheet";
import { ActiveUser } from "../models/activeuser";

import { UserService } from "./user.service";
import { WebApi } from "./api.service";

@Injectable()
export class TimekeepingService {
	constructor(private usrSrv: UserService, private apiSrv: WebApi) {
		Observable.combineLatest(this.usrSrv.userObserver, this.selectedDateObserver,
			(u, d) => {
				return { "user": u, "date": d }
			})
			.subscribe(x => {
				this.getTimesheet(x.user, x.date);
			});
	}

	private timesheet$: BehaviorSubject<Timesheet> = new BehaviorSubject<Timesheet>(undefined);
	private selectedDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date(Date.now()));
	public timesheetObserver: Observable<Timesheet> = this.timesheet$.asObservable();
	public selectedDateObserver: Observable<Date> = this.selectedDate$.asObservable();

	setDate(date: Date) {
		this.selectedDate$.next(date);
	}

	getTimesheet(user: ActiveUser, weekCommencing: Date) {
		// var url = `timekeeping/getTimesheet?user=${user.accountName}&weekCommencing=${weekCommencing}`;
		// this.apiSrv.getOne(url).then(ts => {
		// 	this.timesheet$.next(ts);
		// });
	}
}