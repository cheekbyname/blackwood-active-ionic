import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Assessment } from '../../models/assessment';
import { ActiveUser } from '../../models/activeuser';

import { UserService } from '../../services/user.service';

@Component({
	templateUrl: 'build/pages/initialassess.page/initialassess.page.html',
	styles: [ './initialassess.page.scss' ]
})
export class InitialAssessPage implements OnInit {

	constructor(public navCtrl: NavController, public usrSrv: UserService) {
		this.assess = new Assessment();
		this.assess.visitDate = new Date().toISOString();
	}

	ngOnInit(): void {
		this.usrSrv.getActiveUser().then(user => {
			console.log(user);
			this.assess.visitBy = user.simpleName;
		});
		console.log(this.assess.visitDate);
	}

	assess: Assessment;
	activeUser: ActiveUser;
}
