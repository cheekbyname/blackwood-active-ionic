import { Development } from "./development";
import { Facility } from "./facility";
import { ActiveUserFunction } from "./activeuserfunction";

export class ActiveUser {
	id: number;
	emailName: string;
	simpleName: string;
	accountName: string;
	msgToken: string;
	isHousingUser: boolean;
	isCareUser: boolean;
	validFacilities: Facility[];
	validDevelopments: Development[];
	validFunctions: ActiveUserFunction[];
}

export enum ActiveFunction {
	Unknown = 0,
	SearchDevelopments,
	SearchTenancies,
	SearchFacilities,
	SearchClients,
	AnnualHomeVisit,
	CareInitialAssessment,
	Timekeeping,
	Administrator,
	Debugging
}