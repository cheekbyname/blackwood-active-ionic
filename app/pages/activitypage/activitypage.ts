import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CareActivityService } from '../../services/care.activity.service';

@Component({
    templateUrl: 'build/pages/activitypage/activitypage.html'
})
export class ActivityPage{
    constructor(public navCtrl: NavController, public actSrv: CareActivityService) {

    }
};