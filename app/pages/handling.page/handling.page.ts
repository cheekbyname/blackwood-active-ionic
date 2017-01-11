import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/handling.page/handling.page.html'
})
export class HandlingPage implements OnInit {
	constructor(public navCtrl: NavController) {

	}

	ngOnInit(): void {
		
	}

	transferPeople: number;
	tolietingPeople: number;
	bedpanPeople: number;
	bedMovePeople: number;
	bedTransferPeople: number;
	bedSidePeople: number;
	bathShowerPeople: number;
	walkingSpec: number;
	walkingPeople: number;

}
