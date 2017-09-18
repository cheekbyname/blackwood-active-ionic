import { Component } from "@angular/core";
import { AlertController, ViewController, NavParams, ToastController } from "ionic-angular";

import { Adjustment } from "../../models/adjustment";

import { DateUtils } from "../../services/utility.service";
import { TimekeepingService } from "../../services/timekeeping.service";
import { UserService } from "../../services/user.service";

@Component({
    templateUrl: 'adjustment.popover.html'
})
export class AdjustmentPopover {
    constructor(private viewCtrl: ViewController, private params: NavParams, public utils: DateUtils,
        private alertCtrl: AlertController, private timeSrv: TimekeepingService, private usrSrv: UserService,
        private toast: ToastController) {
        this.adjust = this.params.get('selectedAdjust');
        this.isEditing = (this.adjust !== undefined);
        if (this.isEditing) {
            this.adjust.weekCommencing = new Date(this.adjust.weekCommencing);
            this.adjust.weekCommencing.setHours(1);
            this.selectedDate = this.utils.adjustDate(this.adjust.weekCommencing, this.adjust.dayOffset);
        } else {
            this.selectedDate = this.params.get('selectedDate');
            let wc = this.utils.getWeekCommencingFromDate(this.selectedDate);
            this.adjust = new Adjustment(0, wc, this.utils.diffDays(wc, this.selectedDate));
            this.adjust.requestedBy = this.usrSrv.currentUser.accountName;
            this.adjust.requested = new Date();
        }
    }

    // TODO Perform a check on ionViewWillEnter to prevent modification of accepted/rejected adjustments
	ionViewCanEnter(): boolean {
		return (this.adjust.authorised == null) && (this.adjust.rejected == null);
	}

    adjust: Adjustment;
    selectedDate: Date;
    isEditing: boolean;

    dismiss() {
        this.viewCtrl.dismiss();
    }

    submit() {
        // Both values must have same sign or be zero
        if ((this.adjust.hours > 0 && this.adjust.mins < 0) || (this.adjust.hours < 0 && this.adjust.mins > 0)) {
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
        if (this.adjust.hours == 0 && this.adjust.mins == 0) {
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
        if (this.adjust.reason.length <= 6) {
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
            message: `Submit request for an adjustment of ${this.adjust.hours}h ${this.adjust.mins}m for ${this.utils.dateDesc(this.selectedDate)}?`,
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
        this.timeSrv.submitAdjustRequest(this.adjust).then(adj => {
            let toast = this.toast.create({
                message: 'Your request has been successfully submitted. You will be notified when it has been approved or rejected.',
                duration: 5000
            });
            toast.present();
            // TODO Modal to return changed adjustment
        });
        this.viewCtrl.dismiss();
    }
}