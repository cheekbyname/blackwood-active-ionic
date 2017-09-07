import { Component, Input } from "@angular/core";

import { CarerBooking } from "../../models/carerbooking";

import { DateUtils } from "../../services/utility.service";

@Component({
    selector: 'booking-card',
    templateUrl: 'booking.card.html'
})
export class BookingCard {

    constructor(public utils: DateUtils) {

    }

    @Input()
    booking: CarerBooking;
}