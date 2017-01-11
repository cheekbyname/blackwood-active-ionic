import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/tile.page/tile.page.html'
})
export class TilePage {
	constructor() {

	}

	tileGroups: TileGroup[] = [
		new TileGroup(0, "The Tasks - Do They Involve"),
		new TileGroup(1, "Individual Capability - Does the Job"),
		new TileGroup(2, "The Loads - Are They"),
		new TileGroup(3, "The Working Envrionment - Are There"),
		new TileGroup(4, "Other Factors")
	];

	tileItems: TileItem[] = [
		new TileItem(this.tileGroups[0], "Holding loads away from trunk?"),
		new TileItem(this.tileGroups[0], "Twisting?"),
		new TileItem(this.tileGroups[0], "Stooping?"),
		new TileItem(this.tileGroups[0], "Reaching Upwards?"),
		new TileItem(this.tileGroups[0], "Large vertical movement?"),
		new TileItem(this.tileGroups[0], "Long carrying distances?"),
		new TileItem(this.tileGroups[0], "Strenuous pushing or pulling?"),
		new TileItem(this.tileGroups[0], "Unpredicatable movement of loads?"),
		new TileItem(this.tileGroups[0], "Repetitive handling?"),
		new TileItem(this.tileGroups[0], "Insufficient rest or recovery?"),
		new TileItem(this.tileGroups[0], "A work rate imposed by a process?"),
		new TileItem(this.tileGroups[1], "Requrie unusual capability?"),
		new TileItem(this.tileGroups[1], "Hazard those with a health problem?"),
		new TileItem(this.tileGroups[1], "Hazard those who are pregnant?"),
		new TileItem(this.tileGroups[1], "Call for special information/training?"),
		new TileItem(this.tileGroups[2], "Heavy?"),
		new TileItem(this.tileGroups[2], "Bulky/Unwieldy?"),
		new TileItem(this.tileGroups[2], "Difficult to grasp?"),
		new TileItem(this.tileGroups[2], "Unstable/Unpredicatable?"),
		new TileItem(this.tileGroups[2], "Constraints on posture?"),
		new TileItem(this.tileGroups[3], "Poor floors?"),
		new TileItem(this.tileGroups[3], "Variations in levels?"),
		new TileItem(this.tileGroups[3], "Hot/cold/humid conditions?"),
		new TileItem(this.tileGroups[3], "Strong air movements?"),
		new TileItem(this.tileGroups[3], "Poor lighting conditions?"),
		new TileItem(this.tileGroups[4], "Is movement or posture hindered by clothing or personal protective equipment?")
	];

}

class TileItem {
	tileGroup: TileGroup;
	task: string;
	hazard: boolean;
	remedialAction: string;

	constructor(group: TileGroup, task: string) {
		this.tileGroup =group;
		this.task = task;
	}
}

class TileGroup {
	id: number;
	desc: string;

	constructor(id: number, desc: string) {
		this.id = id;
		this.desc = desc;
	}
}