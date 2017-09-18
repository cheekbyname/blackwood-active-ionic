import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from "rxjs/Rx";

import { WebApi } from './api.service';
import { CareSysUser } from '../models/caresysuser';
import { ActiveUser } from '../models/activeuser';

@Injectable()
export class UserService {
	constructor(private api: WebApi) {
		this.userObserver = this.userSource$.asObservable()
			.distinctUntilChanged((a, b) => {
				if (a == undefined || b == undefined) return false;
				return a.accountName == b.accountName;
			})
			.filter(user => user !== undefined);
		this.userObserver.subscribe(user => console.warn("User authenticated as " + user.accountName));
		this.userKeyObserver = Observable.combineLatest(this.userObserver, this.pushKeyObserver, (x, y) =>
			{ return { user: x, key: y}});
		this.userKeyObserver.subscribe((x) => {
			this.registerPushKey(x.user, x.key);
		});
	}

	userSource$: BehaviorSubject<ActiveUser> = new BehaviorSubject<ActiveUser>(undefined);
	userObserver: Observable<ActiveUser>;
	currentUser: ActiveUser;
	pushKey$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
	pushKeyObserver: Observable<string> = this.pushKey$.asObservable().distinctUntilChanged((a, b) => {
		if (a == undefined || b == undefined) return false;
		return a == b;
	});
	userKeyObserver: Observable<{user: ActiveUser, key: string}>;

	getCurrentUser(): ActiveUser {
		if (this.currentUser) {
			return this.currentUser;
		}
	}

	getActiveUser(): Promise<ActiveUser> {
		return this.api.getOne("user/info", "api")
			.then(user => {
				this.userSource$.next(user);
				this.currentUser = user;
				return user as ActiveUser;
			});
	}

	getCareSysUser(): Promise<CareSysUser> {
		return this.api.getOne("user/getcaresysuser", "api")
			.then(u => {
				return u as CareSysUser
			});
	}

	pushKey(key: string) {
		this.pushKey$.next(key);
	}

	registerPushKey(user: ActiveUser, key: string) {

	}
}