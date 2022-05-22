import { ObjectId } from "mongoose";
export interface IDebtParticipant {
  user: ObjectId;
  amount: number;
}
