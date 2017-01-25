import { Component, Input, OnInit } from '@angular/core';

import { Member } from '../../models/member';
import { Relationship } from '../../models/relationship';

import { MemberService } from '../../services/member.service';

@Component({
	selector: 'member-card',
	templateUrl: 'member.card.html'
})
export class MemberCard implements OnInit {
	@Input()
	mem: Member;

	relation: Relationship;

	constructor(private memSrv: MemberService) { }

	ngOnInit() {
		this.relation = this.memSrv.allRelationships.find(rel => { return rel.ref == this.mem.relationship; });
	}
}