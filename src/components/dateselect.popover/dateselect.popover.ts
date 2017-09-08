import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
	templateUrl: 'dateselect.popover.html'
})
export class DateSelectPopover {
	constructor(private viewCtrl: ViewController) { }
	dismiss(): void {
		this.viewCtrl.dismiss();
	}
}