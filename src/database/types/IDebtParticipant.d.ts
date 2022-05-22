import { ObjectId } from "mongoose";

export interface IDebtParticipant {
  username: string;
  userID: ObjectId;
  amount: number;
}

// export interface IDebtParticipantDocument extends IDebtParticipant, Document {}
