import { ActiveUser } from './activeuser';

export class CareInitialAssessment {

	// Internal
	guid: string;
	user: ActiveUser;

	// Assessment Tab
	name: string;
	prefName: string;
	address1: string;
	visitDate: string;
	visitBy: string;
	visitType: string;
	whatRequired: string;
	whenRequired: string;
	happyVary: boolean;
	timeChange: string;
	genderPref: string;
	altGender: boolean;
	adaptations: string;
	doorEntry: string;
	keyCode: string;
	generalHealth: string;
	disability: string;
	medication: string;
	allergies: string;
	gpDetails: string;
	otherProvider: string;
	nextOfKin: string;
	additionalInfo: string;

	// CheckList Tab
	checkItems: CheckItem[] = [
		new CheckItem("Are internal floors/flooring free from slip and trip hazards?"),
		new CheckItem("Are external areas even and free from holes/loose slabs?"),
		new CheckItem("Are steps, ramps and stairs in good condition?"),
		new CheckItem("Are external access routes free from steep slopes which could be hazardous in icy conditions?"),
		new CheckItem("Is access in general free from hazards?"),
		new CheckItem("Are there no apparent electrical hazards e.g. dodgy wiring, very old switches?"),
		new CheckItem("Is there sufficient lighting inlcuding internal and external artificial light, to safely perform tasks required?"),
		new CheckItem("Is the house free from pets/pests?", "no", "If no, give details. Give details of any concerns e.g. dangerous dogs"),
		new CheckItem("Do occupants avoid smoking while you are in the house?"),
		new CheckItem("Is the neighbourhood one that you would feel comfortable visiting at all times of day?", "no", "If no, describe your concerns"),
		new CheckItem("Would you rate the risk of violence or abuse from the occupants as 'Low'?"),
		new CheckItem("Is the client free from known infection risks?"),
		new CheckItem("Is there a mobile phone signal throughout the areas of the property you visit?"),
		new CheckItem("Are there any hazards related to the work you do e.g. patient handling with insufficient space/incorrect equipment, use of cleaning chemicals, sharps, etc?"),
		new CheckItem("Is there any equipment provided for your use at the property, e.g. by your employer, by another organisation or by the client?", "yes", "If yes, is the equipment properly maintained?")
	];
	fullAssessReqd: boolean;

	// Handling Tab
	aboutPerson: string;
	bodyBuildWeight: number;
	bodyBuildHeight: number;
	riskFalls: number;
	problems: string;
	constraints: string;

	transferSpec: number;
	transferPeople: number;
	transferWalkingAid: string;
	transferAdditional: string;

	toiletSpec: number;
	tolietPeople: number;
	toiletWalkingAid: string;
	toiletAdditional: string;

	bedpanSpec: number;
	bedpanManeuver: number;
	bedpanPeople: number;
	bedpanAdditional: string;
	
	bedMoveSpec: number;
	bedMoveHandlingAid: number;
	bedMovePeople: number;
	bedMoveAdditional: string;

	bedTransferSpec: number;
	bedTransferHandlingAid: number;
	bedTransferPeople: number;
	bedTransferAdditional: string;

	bedsideSpec: number;
	bedsidePeople: number;
	bedsideAdditional: string;

	bathShowerWhich: number;
	bathShowerHandlingAid: number;
	bathShowerSpec: number;
	bathShowerPeople: number;
	bathShowerAdditional: string;

	walkingSpec: number;
	walkingWalkingAid: string;
	walkingPeople: number;
	walkingAdditional: string;

	otherInstructions: string;

	// TILE Tab
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
	overallRisk: number;
}

class CheckItem {
	itemName: string;
	value: string;
	furtherValue: string;
	furtherTitle: string;
	further: string;
	
	constructor(itemName: string, furtherValue?: string, furtherTitle?: string) {
		this.itemName = itemName;
		this.furtherValue = furtherValue;
		this.furtherTitle = furtherTitle;
	}
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