import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { LOC_EN, Locale } from "../models/locale";

@Pipe({
	name: "safeUrl"
})
export class SafeUrlPipe implements PipeTransform
{
	constructor(private domSan: DomSanitizer) {}
	transform(url) {
		return this.domSan.bypassSecurityTrustUrl(url);
	}
}

@Injectable()
export class DateUtils {

	public loc: Locale = LOC_EN;

	public getWeekCommencingFromDate(dt: Date): Date {
		let rd = new Date(dt);
        var dow = rd.getDay() || 7;
        if (dow !== 1) rd.setHours(-24 * (dow - 1));
        return rd;
    }

	public sqlDate(dt: Date): string {
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        return dt.getFullYear() + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + dt.getDate();
	}

	public dayOf(dt: Date): string {
		return this.loc.dayNames[dt.getDay()];
	}

	public monthOf(dt: Date): string {
		return this.loc.monthNames[dt.getMonth()];
	}

	public ordOf(dt: Date): string {
		let dy = dt.getDate().toString();
		if ((dy.length > 1) && (dy.substr(0, 1) == '1')) return dy + 'th';
		switch (dy.substr(dy.length - 1)) {
			case "1":
				return dy + "st";
			case "2":
				return dy + "nd";
			case "3":
				return dy + "rd";
			default:
				return dy + "th";
		}
	}

	public dateDesc(dt: Date): string {
		return `${this.dayOf(dt)} ${this.ordOf(dt)} ${this.monthOf(dt)}`;
	}
}