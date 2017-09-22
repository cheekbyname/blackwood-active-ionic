export class PushMessage {
    received: Date;
    data: { [key: string]: string } [];

    constructor(data: {}[]) {
        this.received = new Date();
        this.data = data;
    }
}
