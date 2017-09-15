import { Development } from "./development";
import { Facility } from "./facility";

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
	validFunctions: ActiveFunction[];
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