import { Date, Document } from "mongoose";

export interface IDebt {
  amount: number;
  date: Date;
  creditors: string[];
  debitors: string[];
  reason: string;
}

export interface IDebtDocument extends IDebt, Document {}
