import { Document, ObjectId } from "mongoose";
import { ICreditor } from "./ICreditor";
import { IDebtor } from "./IDebtor";

export interface IDebt {
  totalAmount: number;
  creditor: ICreditor;
  debtors: Array<IDebtor>;
  reason: string;
}

export interface IDebtDocument extends IDebt, Document {}
