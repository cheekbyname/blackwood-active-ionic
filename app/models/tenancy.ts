export class Tenancy {
    Id: number;
    ActiveHash: Uint8Array;
    TenancyRef: string;
    HouseRef: string;
    PropRef: string;
    TenureRef: string;
    TenureDesc: string;
    HouseDesc: string;
    TenancyStart: Date;
    TopAddressLine: string;
    DefaultCommsTypeRef: string;
    DefaultCommsValue: string;
    HasEmail: boolean;
    HasPhone: boolean;
    TenagreeSid: number;
}