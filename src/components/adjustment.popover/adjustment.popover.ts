import { Component } from "@angular/core";
import { AlertController, ViewController, NavParams } from "ionic-angular";

import { DateUtils } from "../../services/utility.service";

@Component({
    templateUrl: 'adjustment.popover.html'
})
export class AdjustmentPopover {
    constructor(private viewCtrl: ViewController, private params: NavParams, public utils: DateUtils,
        private alertCtrl: AlertController) {
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
                }
                ]
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
        this.viewCtrl.dismiss();
    }
}