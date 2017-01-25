import { Injectable } from '@angular/core';

@Injectable()
export class DebugService {

	enableDummyData: boolean = false;
	logEvents: DebugEvent[] = [];

	constructor() {

	}

	log(what: string): void {
		this.logEvents.push(new DebugEvent(what));
	}
}

class DebugEvent {
	when: Date;
	what: string;

	constructor(what: string) {
		this.when = new Date(Date.now());
		this.what = what;
	}
}