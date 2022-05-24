import { ObjectId } from "mongoose";
interface ICreditor {
  uid: ObjectId;
  username: string;
}

export class Creditor implements ICreditor {}
