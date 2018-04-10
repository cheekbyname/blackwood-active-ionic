import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NavController, NavParams } from "ionic-angular";

import { CareInitialAssessment } from "../../../models/careinitialassessment";

import { CareActivityService } from "../../../services/care.activity.service";
import { LOC_EN, Locale } from "../../../utils/locale.utils";

@Component({
    templateUrl: 'clevercogs.assess.page.html'
})
export class CleverCogsAssessPage {
    assess: CareInitialAssessment;
	form: FormGroup;
	
	constructor(public actSrv: CareActivityService, public navCtrl: NavController, public params: NavParams ) {
		this.assess = this.params.get("assess");
		this.form = this.params.get("form");
	}

	loc: Locale = LOC_EN;
}