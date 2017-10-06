import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

import { CarerBooking } from "../../models/carerbooking";
import { CarerContract } from "../../models/contract";

import { DateUtils } from "../../utils/date.utils";

@Component({
    selector: 'booking-detail',
    templateUrl: 'booking.detail.popover.html'
})
export class BookingDetailPopover {
    constructor(private parms: NavParams, private viewCtrl: ViewController) {
        this.booking = parms.get("booking");
        this.contract = parms.get("contract");
    }

    booking: CarerBooking;
    contract: CarerContract;

    DateUtils = DateUtils;

    dismiss() {
        this.viewCtrl.dismiss();
    }
}