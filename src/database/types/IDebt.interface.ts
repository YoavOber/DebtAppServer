import { Document } from "mongoose";

export interface IDebt {
  amount: number;
  creditors: string[];
  debitors: string[];
  reason: string;
}

export interface IDebtDocument extends IDebt, Document {}
