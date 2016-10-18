import { Component, Input } from '@angular/core';

import { Member } from '../../models/member';

@Component({
	selector: 'member-card',
	templateUrl: 'build/components/membercard/membercard.html'
})
export class MemberCard {
	@Input()
	mem: Member;
}