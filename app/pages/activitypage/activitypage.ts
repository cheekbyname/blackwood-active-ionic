import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ActivityService } from '../../services/activity.service';

@Component({
    templateUrl: 'build/pages/activitypage/activitypage.html'
})
export class ActivityPage{
    constructor(public navCtrl: NavController, public actSrv: ActivityService) {
        
    }
};