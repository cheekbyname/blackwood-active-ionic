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
    public postcode: string;
    public addressTypeId: Guid;
    public sharedDiaryConsent: boolean;
    public sharedNotesConsent: boolean;
    public sharedApptsConsent: boolean;

    public relationship: CareRelationship = new CareRelationship();
    public addressType: AddressType = new AddressType();

    public static Controls(contact: CareContact) {
        return {
            title: [contact.title],
            forenames: [contact.forenames],
            surname: [contact.surname],
            phone: [contact.phone],
            mobile: [contact.mobile],
            email: [contact.email],
            fax: [contact.fax],
            address1: [contact.address1],
            address2: [contact.address2],
            town: [contact.town],
            postcode: [contact.postcode],
            sharedDiaryConsent: [contact.sharedDiaryConsent],
            sharedNotesConsent: [contact.sharedNotesConsent],
            sharedApptsConsent: [contact.sharedApptsConsent],
            relationship: [contact.relationship],
            addressType: [contact.addressType]
        }
    }
}

