import { Document } from "mongoose";
import { IDebtParticipant } from "./IDebtParticipant";

export interface IDebt {
  totalAmount: number;
  creditors: Array<IDebtParticipant>;
  debitors: Array<IDebtParticipant>;
  reason: string;
}

export interface IDebtDocument extends IDebt, Document {}
