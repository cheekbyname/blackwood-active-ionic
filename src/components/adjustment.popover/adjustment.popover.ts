import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
    templateUrl: 'adjustment.popover.html'
})
export class AdjustmentPopover {
    constructor(private viewCtrl: ViewController) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}