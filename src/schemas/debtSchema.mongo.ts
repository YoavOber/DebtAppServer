import { model, Schema } from "mongoose";
import { IDebt } from "../interfaces/IDebt.interface";

const debtSchema = new Schema({
  amount: { type: Number, required: true },
  data: { type: Date, required: true },
  debitors: { type: [], required: true },
  creditors: { type: [], required: true },
  reason: { type: String, required: true },
});

export const Debt = model<IDebt>("Debt", debtSchema);
