import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { CareSysUser } from '../models/caresysuser';
import { ActiveUser } from '../models/activeuser';

@Injectable()
export class UserService {
	constructor(private api: WebApi) {

	}

	currentUser: ActiveUser;

	getCurrentUser(): ActiveUser {
		if (this.currentUser) {
			return
		}
	}

	getActiveUser(): Promise<ActiveUser> {
		return this.api.getOne("user/info", "api")
			.then(user => {
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
}