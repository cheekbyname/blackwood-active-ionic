import { Component, Input } from "@angular/core";

@Component({
    selector: "dual-column",
    templateUrl: "dual-column.ion-grid.html"
})
export class DualColumnIonGrid {
    @Input()
    col1: string;

    @Input()
    col2: string;
}