import { ActiveUser } from './activeuser';
import { CareContact } from './contact';

export class CareInitialAssessment {

	// Internal
	guid: string;
	activeUser: ActiveUser;

	// Assessment Tab
	name: string;
	prefName: string;
	address1: string;
	telephoneNumber: string;
	dateOfBirth: string;
	visitDate: string;
	visitBy: string;
	visitType: string;
	livesAlone: boolean;
	hasCareOrSupport: boolean;
	blackwoodHours: number;
	otherCare: string;
	hasOtherProvider: boolean;
	otherProviderHours: number;
	whatRequired: string;
	overallHealth: Ratings;
	generalHealth: string;
	disabilityVisual: boolean;
	disabilityHearing: boolean;
	disabilityCognitiveLifelong: boolean;
	disabilityPhysicalLifelong: boolean;
	disabilityCognitiveAgeRelated: boolean;
	disabilityPhysicalAgeRelated: boolean;
	disabilityChronicIllness: boolean;
	disabilityOther: boolean;
	disabilityOtherDetails: string;
	timesFallen: number = 0;
	fallenHospital: boolean;
	personalPoorExercise: boolean;
	personalHygiene: boolean;
	personalNutrition: boolean;
	personalColdTolerance: boolean;
	personalHydration: boolean;
	familyCarer: string;
	eyeSight: number;
	hearing: string;
	communicationAbility: string;
	comms: CommsItem[] = DEFAULT_COMMS_ITEMS;
	continence: number;
	continenceDetails: string;
	dexterity: number;
	adaptations: string;
	mentalHealth: string;
	dietaryRequirements: string;
	foodDrinkPreferences: string;
	socialInterests: string;
	religionCulture: string;
	whenRequired: string;
	bedUpTime: Date;
	bedDownTime: Date;
	sleepPattern: string;
	staffRequirements: string;
	happyVary: boolean;
	timeChange: string;
	genderPref: string;
	genderDetails: string;
	altGender: boolean;
	accessArrangements: string;
	doorEntry: string;
	keyCode: string;
	disability: string;
	medication: string;
	medicationCapacity: number;	// 0: Has capacity, 1: Does not have Capacity, 2: Has been referred to GP for assessment
	medicMorningVisit: boolean;
	medicLunchVisit: boolean;
	medicTeatimeVisit: boolean;
	medicBedtimeVisit: boolean;
	medicOtherVisit: boolean;
	medicOtherVisitDetails: string;
	medicOralGrading: number;
	medicNonOralGrading: number; // 1: Independent, 2: Prompt & Assist, 3: Administer (with capacity), 4: Administer (without cap.)
	whoOrdersMedication: number;	// Us or Family? 0 - Blackwood, 1 - Family
	forgetsMedication: ForgetsMedication;
	allergies: string;
	gpDetails: string;
	otherProvider: string;
	nextOfKin: string;
	contacts: CareContact[] = [];
	specificRisks: string;
	goals: string;
	additionalInfo: string;
	issueIntruders: number = 0;
	issueBogusCalls: number = 0;
	issueGoingOut: number = 0;
	issueScalds: number = 0;
	issueCooker: number = 0;
	issueFlooding: number = 0;
	issueOpenDoors: number = 0;
	signature: string;

	// CleverCogs Tab
	videoCameraConsent: boolean;
	videoCameraConsentComments: string;
	videoCareConsent: boolean;
	videoCareConsentComments: boolean;
	videoCameraLocation: string;
	socialWorkReferral: boolean;
	socialWorkReferralWho: string;
	socialWorkReferralWhen: string;
	fallDetector: boolean;
	safetyAlarm: boolean;
	landlineSupplier: string;
	hasExistingBroadband: boolean;
	existingBroadbandSupplier: string;
	cleverCogsReasons: CleverCogsReason[] = DEFAULT_REASONS;
	cleverCogsOtherReason: string;
	cleverCogsFeatures: CleverCogsFeature[] = DEFAULT_FEATURES;
	cleverCogsOtherFeature: string;
	currentlyHasDevices: Device[] = DEFAULT_OWNED_DEVICES;
	planningToGetDevices: Device[] = DEFAULT_PLANNED_DEVICES;
	internetUsage: number;
	internetUsageFrequency: number;
	internetUsageAbility: number;
	trainingSupport: number;
	trainingAvailability: TrainingAvailability[] = DEFAULT_AVAILABILITY;
	spendingTime: number;
	customLeisureActivity: string;
	customEntertainment: string;
	customSocialising: string;
	customHobbies: string;
	customWork: string;
	customCaringOthers: string;

	// CheckList Tab
	checkItems: CheckItem[] = DEFAULT_CHECK_ITEMS;
	otherHazards: string;
	furtherAction: string;
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
	tileGroups: TileGroup[] = DEFAULT_TILE_GROUPS;
	overallRisk: number;
	active: boolean;
}

class CheckItem {
	itemId: number;
	itemName: string;
	value: string;
	furtherValue: string;
	furtherTitle: string;
	further: string;
	
	constructor(itemId: number, itemName: string, furtherValue?: string, furtherTitle?: string) {
		this.itemId = itemId;
		this.itemName = itemName;
		this.furtherValue = furtherValue;
		this.furtherTitle = furtherTitle;
	}
}

export const DEFAULT_CHECK_ITEMS = [
	new CheckItem(0, "Are internal floors/flooring free from slip and trip hazards?"),
	new CheckItem(1, "Are external areas even and free from holes/loose slabs?"),
	new CheckItem(2, "Are steps, ramps and stairs in good condition?"),
	new CheckItem(3, "Are external access routes free from steep slopes which could be hazardous in icy conditions?"),
	new CheckItem(4, "Is access in general free from hazards?"),
	new CheckItem(5, "Are there no apparent electrical hazards e.g. dodgy wiring, very old switches?"),
	new CheckItem(6, "Is there sufficient lighting inlcuding internal and external artificial light, to safely perform tasks required?"),
	new CheckItem(7, "Is the house free from pets/pests?", "no", "If no, give details. Give details of any concerns e.g. dangerous dogs"),
	new CheckItem(8, "Do occupants avoid smoking while you are in the house?"),
	new CheckItem(9, "Is the neighbourhood one that you would feel comfortable visiting at all times of day?", "no", "If no, describe your concerns"),
	new CheckItem(10, "Would you rate the risk of violence or abuse from the occupants as 'Low'?"),
	new CheckItem(11, "Is the client free from known infection risks?"),
	new CheckItem(12, "Is there a mobile phone signal throughout the areas of the property you visit?"),
	new CheckItem(13, "Are there any hazards related to the work you do e.g. patient handling with insufficient space/incorrect equipment, use of cleaning chemicals, sharps, etc?"),
	new CheckItem(14, "Is there any equipment provided for your use at the property, e.g. by your employer, by another organisation or by the client?", "yes", "If yes, is the equipment properly maintained?")
];

class TileItem {
	groupId: number;
	itemId: number;
	task: string;
	hazard: boolean;
	remedialAction: string;

	constructor(groupId: number, itemId: number, task: string) {
		this.groupId = groupId;
		this.itemId = itemId;
		this.task = task;
	}
}

class TileGroup {
	groupId: number;
	title: string;
	desc: string;
	items: TileItem[];

	constructor(groupId: number, title: string, desc: string, items: TileItem[]) {
		this.groupId = groupId;
		this.title = title;
		this.desc = desc;
		this.items = items;
	}
}

export const DEFAULT_TILE_GROUPS = [
	new TileGroup(0, "Task", "The Tasks - Do They Involve:", [
		new TileItem(0, 0, "Holding loads away from trunk?"),
		new TileItem(0, 1, "Twisting?"),
		new TileItem(0, 2, "Stooping?"),
		new TileItem(0, 3, "Reaching Upwards?"),
		new TileItem(0, 4, "Large vertical movement?"),
		new TileItem(0, 5, "Long carrying distances?"),
		new TileItem(0, 6, "Strenuous pushing or pulling?"),
		new TileItem(0, 7, "Unpredicatable movement of loads?"),
		new TileItem(0, 8, "Repetitive handling?"),
		new TileItem(0, 9, "Insufficient rest or recovery?"),
		new TileItem(0, 10, "A work rate imposed by a process?")
	]),
	new TileGroup(1, "Individual", "Individual Capability - Does the Job:", [
		new TileItem(1, 0, "Requrie unusual capability?"),
		new TileItem(1, 1, "Hazard those with a health problem?"),
		new TileItem(1, 2, "Hazard those who are pregnant?"),
		new TileItem(1, 3, "Call for special information/training?"),
	]),
	new TileGroup(2, "Load", "The Loads - Are They:", [
		new TileItem(2, 0, "Heavy?"),
		new TileItem(2, 1, "Bulky/Unwieldy?"),
		new TileItem(2, 2, "Difficult to grasp?"),
		new TileItem(2, 3, "Unstable/Unpredicatable?"),
		new TileItem(2, 4, "Constraints on posture?"),
	]),
	new TileGroup(3, "Environment", "The Working Envrionment - Are There:", [
		new TileItem(3, 0, "Poor floors?"),
		new TileItem(3, 1, "Variations in levels?"),
		new TileItem(3, 2, "Hot/cold/humid conditions?"),
		new TileItem(3, 3, "Strong air movements?"),
		new TileItem(3, 4, "Poor lighting conditions?"),
	]),
	new TileGroup(4, "Other", "Other Factors:", [
		new TileItem(4, 0, "Is movement or posture hindered by clothing or personal protective equipment?")
	])
];

class CommsItem {
	itemId: number;
	title: string;
	preferred: boolean;

	constructor(itemId: number, title: string) {
		this.itemId = itemId;
		this.title = title;
	}
}

export const DEFAULT_COMMS_ITEMS = [
	new CommsItem(0, "Phone"),
	new CommsItem(1, "Email"),
	new CommsItem(2, "Face to Face"),
	new CommsItem(3, "Audio"),
	new CommsItem(4, "Braille"),
	new CommsItem(5, "Written - Standard Print"),
	new CommsItem(6, "Written - Large Print")
];

class CleverCogsReason {
	reason: number;
	title: string;
	given: boolean;

	constructor(reason: number, title: string) {
		this.reason = reason;
		this.title = title;
	}
}

export const DEFAULT_REASONS = [
	new CleverCogsReason(0, "Stay in touch with friends or family"),
	new CleverCogsReason(1, "Safety"),
	new CleverCogsReason(2, "Access information online"),
	new CleverCogsReason(3, "Making new friends"),
	new CleverCogsReason(4, "Communicate with staff/carers more easily"),
	new CleverCogsReason(5, "Independence and privacy benefits"),
	new CleverCogsReason(6, "Making day-to-day life easier"),
	new CleverCogsReason(7, "More quality time with staff/carers"),
	new CleverCogsReason(8, "Don't know"),
	new CleverCogsReason(9, "Other")
];

class CleverCogsFeature {
	feature: number;
	title: string;
	desc: string;
	given: boolean;

	constructor(feature: number, title: string, desc: string) {
		this.feature = feature;
		this.title = title;
		this.desc = desc;
	}
}

export const DEFAULT_FEATURES = [
	new CleverCogsFeature(0, "Calendar", "Memory aids such as medication and appointment prompts"),
	new CleverCogsFeature(1, "Entertainment", "Gaming, Music, Radio Stations, Photo Albums"),
	new CleverCogsFeature(2, "Family & Friends", "Video chats with relatives/close friends at a distance"),
	new CleverCogsFeature(3, "Information", "Accessibility of health & wellbeing websites"),
	new CleverCogsFeature(4, "My own interests", ""),
	new CleverCogsFeature(5, "Don't know", ""),
	new CleverCogsFeature(6, "Other", "")
];

class Device {
	device: number;
	title: string;
	given: boolean;

	constructor(device: number, title: string) {
		this.device = device;
		this.title = title;
	}
}

export const DEFAULT_OWNED_DEVICES = [
	new Device(0, "PC"),
	new Device(1, "Laptop"),
	new Device(2, "Tablet"),
	new Device(3, "Smartphone"),
	new Device(4, "No Device")
];

export const DEFAULT_PLANNED_DEVICES = [
	new Device(0, "PC"),
	new Device(1, "Laptop"),
	new Device(2, "Tablet"),
	new Device(3, "Smartphone")
];

class TrainingAvailability {
	dayOfWeek: number;
	available: boolean;
	title: string;

	constructor(dayOfWeek: number, title: string) {
		this.dayOfWeek = dayOfWeek;
		this.title = title;
	}
}

export const DEFAULT_AVAILABILITY  = [
	new TrainingAvailability(0, "Monday"),
	new TrainingAvailability(1, "Tuesday"),
	new TrainingAvailability(2, "Wednesday"),
	new TrainingAvailability(3, "Thursday"),
	new TrainingAvailability(4, "Friday")
];

export enum Ratings {
	NoneSelected,
	VeryPoor,
	Poor,
	Fair,
	Good,
	VeryGood
}

export const RATINGS = [
	{ key: Ratings.NoneSelected, value: "" },
	{ key: Ratings.VeryPoor, value: "Very Poor" },
	{ key: Ratings.Poor, value: "Poor" },
	{ key: Ratings.Fair, value: "Fair" },
	{ key: Ratings.Good, value: "Good" },
	{ key: Ratings.VeryGood, value: "Very Good" }
];

export enum ForgetsMedication {
	NAorNever,
	OnceADay,
	OnceAWeek,
	FewTimesAWeek
}

export const FORGETS_MEDIC = [
	{ key: ForgetsMedication.NAorNever, value: "N/A, Not Recorded or Never forgets" },
	{ key: ForgetsMedication.OnceADay, value: "Once a Day" },
	{ key: ForgetsMedication.OnceAWeek, value: "Once a week" },
	{ key: ForgetsMedication.FewTimesAWeek, value: "Few times a week" }
];