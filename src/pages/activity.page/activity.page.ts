// Angular/Ionic
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';
import { NotificationService } from "../../services/notification.service";
import { UserService } from "../../services/user.service";

// Models
import { ActiveFunction } from "../../models/activeuser";
import { CareInitialAssessment } from '../../models/careinitialassessment';
import { PushMessage } from "../../models/pushmessage";

// Components
import { AssessTabsPage } from '../assesstabs.page/assesstabs.page';

@Component({
    templateUrl: 'activity.page.html'
})
export class ActivityPage implements OnInit {

    assessments: CareInitialAssessment[];
    messages: PushMessage[];

    allowAssess: boolean = false;
    showAssess: boolean = false;
    showMessages: boolean = false;

    constructor(public navCtrl: NavController, public actSrv: CareActivityService, public notSrv: NotificationService,
        private usrSrv: UserService) {
        this.notSrv.pushMessageObserver.subscribe(msgs => this.messages = msgs.reverse());
        this.allowAssess = this.usrSrv.currentUser.validFunctions.some(fn => fn == ActiveFunction.CareInitialAssessment);
    }

    ngOnInit() {
        this.actSrv.getAllCareInitialAssessments().then(res => {
            this.assessments = res.sort((a, b) => { return a.visitDate < b.visitDate ? 1 : 0 });
        });
    }

    dateOf(assess: CareInitialAssessment): string {
        return new Date(assess.visitDate).toLocaleDateString();
    }

    timeOf(assess: CareInitialAssessment): string {
        return new Date(assess.visitDate).toLocaleTimeString().substr(0, 5);
    }

    openCareInitialAssessment(assess: CareInitialAssessment): void {
        this.actSrv.currentCareInitialAssessment = assess;
        this.navCtrl.push(AssessTabsPage);
    }

    doRefresh(refresher) {
        this.actSrv.getAllCareInitialAssessments().then(res => {
            this.assessments = res;
            refresher.complete();
        });
    }

    toggleAssess() {
        this.showAssess = !this.showAssess;
    }

    toggleMessages() {
        this.showMessages = !this.showMessages;
    }
};