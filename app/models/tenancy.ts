export class Tenancy {
    id: number;
    activeHash: Uint8Array;
    tenancyRef: string;
    houseRef: string;
    propRef: string;
    tenureRef: string;
    tenureDesc: string;
    houseDesc: string;
    tenancyStart: Date;
    topAddressLine: string;
    defaultCommsTypeRef: string;
    defaultCommsValue: string;
    hasEmail: boolean;
    hasPhone: boolean;
    tenagreeSid: number;
}