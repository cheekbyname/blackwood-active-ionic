import { CareRelationship } from "./carerelationship";
import { AddressType } from "./addresstype";
import { Guid } from "./Utilities";

export class CareContact {
    public id: number;
    public careInitialAssessmentId: number;
    public careRelationshipId: Guid;
    public title: string;
    public forenames: string;
    public surname: string;
    public phone: string;
    public mobile: string;
    public email: string;
    public fax: string;
    public address1: string;
    public address2: string;
    public town: string;
    public postCode: string;
    public addressTypeId: Guid;

    public relationship: CareRelationship = new CareRelationship();
    public addressType: AddressType = new AddressType();
}
