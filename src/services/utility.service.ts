import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { LOC_EN, Locale } from "../utils/locale.utils";

@Pipe({
	name: "safeUrl"
})
export class SafeUrlPipe implements PipeTransform {
	constructor(private domSan: DomSanitizer) { }
	transform(url) {
		return this.domSan.bypassSecurityTrustUrl(url);
	}
}

export class DateUtils {
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
		return LOC_EN.dayNames[dt.getDay()];
	}

	public monthOf(dt: Date): string {
		return LOC_EN.monthNames[dt.getMonth()];
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

	public shortDateDesc(dt: Date): string {
		return `${this.ordOf(dt)} ${this.monthOf(dt)}`;
	}

	public timeFromDate(dt: string): string {
		var ndt = new Date(dt);
		var hr = "0" + ndt.getHours();
		var mn = "0" + ndt.getMinutes();
		return hr.substr(hr.length - 2) + ":" + mn.substr(mn.length - 2);
	}

	public displayTime(mins: number): string {
		if (mins < 0) {
			return Math.ceil(mins / 60) + "h " + (mins % 60) + "m";
		}
		return Math.floor(mins / 60) + "h " + (mins % 60) + "m";
	}

	public diffDays(dt1: Date, dt2: Date): number {
		return Math.round((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));
	}

	public adjustDate(adjDate: Date, offset: number): Date {
		let dt: Date = new Date(adjDate);
		dt.setDate(dt.getDate() + offset);
		return dt;
	}
}