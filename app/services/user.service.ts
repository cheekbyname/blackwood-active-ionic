import { Injectable } from '@angular/core';

import { WebApi } from './api.service';
import { CareSysUser } from '../models/caresysuser';

@Injectable()
export class UserService {
	constructor(private api: WebApi) { }

	getCareSysUser(): Promise<CareSysUser> {
		return this.api.getOne("user/getcaresysuser", "api")
			.then(u => {
				return u as CareSysUser
			});
	}

	getAccountName(): Promise<string> {
		return this.api.getOne("user/accountname", "api")
			.then(u => u as string);
	}
}