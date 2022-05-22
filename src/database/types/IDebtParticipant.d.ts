import { ObjectId } from "mongoose";

export interface IDebtParticipant {
  username: string;
  uid: ObjectId;
  amount: number;
}
