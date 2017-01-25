import { Component, Input, OnInit } from '@angular/core';

import { Comm } from '../../models/comm';

@Component({
	selector: 'comm-card',
	templateUrl: 'comm.card.html'
})
export class CommCard implements OnInit {
	@Input()
	com: Comm;

	static COM_TYPES = [
		{ ref: "MT", desc: "Mobile Telephone", icon: "phone-portrait", href: "tel" },
		{ ref: "T", desc: "Telephone", icon: "call", href: "tel" },
		{ ref: "E", desc: "Email Preferred", icon: "mail-open", href: "mailto" },
		{ ref: "I", desc: "Email for Info", icon: "mail", href: "mailto" }
	];

	TypeDesc: string;
	TypeIcon: string;
	TypeHref: string;

	ngOnInit() {
		let thisType = CommCard.COM_TYPES.find(type => type.ref == this.com.commsTypeRef);
		this.TypeDesc = thisType.desc;
		this.TypeIcon = thisType.icon;
		this.TypeHref = thisType.href;
	}

	contact(): void {
		// TODO
	}
}