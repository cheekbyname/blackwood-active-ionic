import { ActiveFunction, ActiveUser } from "./activeuser";

export class ActiveUserFunction {
    public id: number;
    public activeUserId: number;
    public activeFunction: ActiveFunction;

    public user: ActiveUser;
}