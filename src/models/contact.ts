export class CareContact {
    public id: number;
    public relationship: CareRelationship;
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
    public addressType: AddressType;
}

export enum CareRelationship {
    Daughter
}

export enum AddressType {

}

export const CARE_RELATIONSHIPS = [
    { key: CareRelationship.Daughter, value: "Daughter" }
];