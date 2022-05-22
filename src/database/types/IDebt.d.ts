import { Document, ObjectId } from "mongoose";
import { IDebtor } from "./IDebtor";

export interface IDebt {
  totalAmount: number;
  creditor: ObjectId;
  debtors: Array<IDebtor>;
  reason: string;
}

export interface IDebtDocument extends IDebt, Document {}
