import { Guid } from "./Utilities";

export class CareRelationship {
    public guid: Guid;
    public enumValue: number;
    public description: string;

    constructor() {
        this.description = "";
    }
}