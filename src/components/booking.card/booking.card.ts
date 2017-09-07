import { Component, Input } from "@angular/core";

import { CarerBooking } from "../../models/carerbooking";

@Component({
    selector: 'booking-card',
    templateUrl: 'booking.card.html'
})
export class BookingCard {

    @Input()
    booking: CarerBooking;

}