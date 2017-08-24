import { Carer } from './carer';
import { CarerContract } from './contract';
import { Availability } from './availability';
import { CarerBooking } from './carerbooking';
import { Shift } from './shift';
import { Adjustment } from './adjustment';

export class Timesheet {
	public carerCode: number;
	public weekCommencing: Date;
	public carer: Carer;
	public contracts: CarerContract[];
	public scheduledAvailability: Availability[];
	public actualAvailability: Availability[];
	public bookings: CarerBooking[];
	public shifts: Shift[];
	public adjustments: Adjustment[];
}