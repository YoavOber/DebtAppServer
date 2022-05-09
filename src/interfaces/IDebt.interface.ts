import { Date, Document } from "mongoose";

export interface IDebt extends Document {
  amount: number;
  date: Date;
  creditors: [];
  debitors: [];
  reason: string;
}
