// Angular/Ionic
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'assesscheck.page.html'
})
export class AssessCheckPage implements OnInit {
	
	assess: CareInitialAssessment;
	form: FormGroup;

	constructor(public navCtrl: NavController, public params: NavParams, public actSrv: CareActivityService) {
		this.assess = this.params.get('assess');
		this.form = this.params.get('form');
	}

	ngOnInit() {
		this.assess.checkItems.forEach(item => {
			let itemName = 'checkItem_' + this.assess.checkItems.indexOf(item);
			this.form.addControl(itemName, new FormControl());
			this.form.addControl(itemName + '_further', new FormControl());
		});
		this.form.addControl('otherHazards', new FormControl());
		this.form.addControl('furtherAction', new FormControl());
		this.form.addControl('fullAssessReqd', new FormControl());
	}
}

