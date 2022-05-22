import { Document, ObjectId } from "mongoose";
import { IDebtParticipant } from "./IDebtParticipant";

export interface IDebt {
  totalAmount: number;
  creditor: ObjectId;
  debtors: Array<IDebtParticipant>;
  reason: string;
}

export interface IDebtDocument extends IDebt, Document {}
