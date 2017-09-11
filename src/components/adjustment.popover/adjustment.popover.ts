import { Component } from "@angular/core";
import { AlertController, ViewController, NavParams } from "ionic-angular";

import { Adjustment } from "../../models/adjustment";

import { DateUtils } from "../../services/utility.service";
import { TimekeepingService } from "../../services/timekeeping.service";
import { UserService } from "../../services/user.service";

@Component({
    templateUrl: 'adjustment.popover.html'
})
export class AdjustmentPopover {
    constructor(private viewCtrl: ViewController, private params: NavParams, public utils: DateUtils,
        private alertCtrl: AlertController, private timeSrv: TimekeepingService, private usrSrv: UserService) {
        this.selectedDate = this.params.get('selectedDate');
    }

    selectedDate: Date;
    adjustReason: string = '';
    adjustHours: number = 0;
    adjustMins: number = 0;

    dismiss() {
        this.viewCtrl.dismiss();
    }

    submit() {
        // TODO Validation
        // Both values must have same sign or be zero
        if ((this.adjustHours > 0 && this.adjustMins < 0) || (this.adjustHours < 0 && this.adjustMins > 0)) {
            let alert = this.alertCtrl.create({
                title: 'Invalid Time Selected',
                message: "You can't add hours and subtract minutes, or add minutes and subtract hours. Both must be added or both be subtracted.",
                buttons: [{
                    text: 'Ok',
                    handler: () => { }
                }]
            });
            alert.present();
            return;
        }

        // Both values cannot be zero
        if (this.adjustHours == 0 && this.adjustMins == 0) {
            let alert = this.alertCtrl.create({
                title: 'No Time Selected',
                message: 'You must selected an amount of time, hours and/or minutes, for this adjustment.',
                buttons: [{
                    text: 'Ok',
                    handler: () => { }
                }]
            })
            alert.present();
            return;
        }

        // Must be some meaningful text in reason
        if (this.adjustReason.length <= 6) {
            let alert = this.alertCtrl.create({
                title: 'Insufficient Explanation',
                message: 'Please provide a meaningful explanation why this adjustment is required so that your Team Manager can approve it.',
                buttons: [{
                    text: 'Ok',
                    handler: () => { }
                }]
            });
            alert.present();
            return;
        }

        let confirm = this.alertCtrl.create({
            title: 'Submit this request?',
            message: `Submit request for an adjustment of ${this.adjustHours}h ${this.adjustMins}m for ${this.utils.dateDesc(this.selectedDate)}?`,
            buttons: [{
                text: 'Cancel',
                handler: () => { }
            },
            {
                text: 'Submit',
                handler: () => this.sendRequest()
            }]
        });
        confirm.present();
    }

    sendRequest() {
        let wc = this.utils.getWeekCommencingFromDate(this.selectedDate);
        let adjust: Adjustment = new Adjustment(0, wc, this.utils.diffDays(wc, this.selectedDate));
        adjust.reason = this.adjustReason;
        adjust.hours = this.adjustHours;
        adjust.mins = this.adjustMins;
        adjust.requestedBy = this.usrSrv.currentUser.accountName;
        adjust.requested = new Date();

        this.timeSrv.submitAdjustRequest(adjust);
        // TODO Toast when saved successfully
        this.viewCtrl.dismiss();
    }
}