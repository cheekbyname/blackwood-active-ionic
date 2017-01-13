// Angular/Ionic
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Services
import { CareActivityService } from '../../services/care.activity.service';

// Models
import { CareInitialAssessment } from '../../models/careinitialassessment';

@Component({
	templateUrl: 'build/pages/tile.page/tile.page.html'
})
export class TilePage {
	constructor(public navCtrl: NavController, public actSrv: CareActivityService) {
		this.assess = this.actSrv.getCurrentCareInitialAssessment();
	}

	assess: CareInitialAssessment;

	overallRisk: string;

	tileGroups: TileGroup[] = [
		new TileGroup(0, "Task", "The Tasks - Do They Involve:", [
			new TileItem("Holding loads away from trunk?"),
			new TileItem("Twisting?"),
			new TileItem("Stooping?"),
			new TileItem("Reaching Upwards?"),
			new TileItem("Large vertical movement?"),
			new TileItem("Long carrying distances?"),
			new TileItem("Strenuous pushing or pulling?"),
			new TileItem("Unpredicatable movement of loads?"),
			new TileItem("Repetitive handling?"),
			new TileItem("Insufficient rest or recovery?"),
			new TileItem("A work rate imposed by a process?")
		]),
		new TileGroup(1, "Individual", "Individual Capability - Does the Job:", [
			new TileItem("Requrie unusual capability?"),
			new TileItem("Hazard those with a health problem?"),
			new TileItem("Hazard those who are pregnant?"),
			new TileItem("Call for special information/training?"),
		]),
		new TileGroup(2, "Load", "The Loads - Are They:", [
			new TileItem("Heavy?"),
			new TileItem("Bulky/Unwieldy?"),
			new TileItem("Difficult to grasp?"),
			new TileItem( "Unstable/Unpredicatable?"),
			new TileItem("Constraints on posture?"),
		]),
		new TileGroup(3, "Environment", "The Working Envrionment - Are There:", [
			new TileItem("Poor floors?"),
			new TileItem("Variations in levels?"),
			new TileItem("Hot/cold/humid conditions?"),
			new TileItem("Strong air movements?"),
			new TileItem("Poor lighting conditions?"),
		]),
		new TileGroup(4, "Other", "Other Factors:", [
			new TileItem("Is movement or posture hindered by clothing or personal protective equipment?")
		])
	];

}

class TileItem {
	task: string;
	hazard: boolean;
	remedialAction: string;

	constructor(task: string) {
		this.task = task;
	}
}

class TileGroup {
	id: number;
	title: string;
	desc: string;
	items: TileItem[];

	constructor(id: number, title: string, desc: string, items: TileItem[]) {
		this.id = id;
		this.title = title;
		this.desc = desc;
		this.items = items;
	}
}