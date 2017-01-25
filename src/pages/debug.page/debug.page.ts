// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { DebugService } from '../../services/debug.service';

@Component({
    templateUrl: 'debug.page.html'
})
export class DebugPage{

    constructor(public navCtrl: NavController, public debug: DebugService) {

    }
};