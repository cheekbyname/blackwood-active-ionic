import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
	templateUrl: 'homefilter.popover.html'
})
export class HomeFilterPopover {
	constructor(private viewCtrl: ViewController) { }
	dismiss(): void {
		this.viewCtrl.dismiss();
	}
}