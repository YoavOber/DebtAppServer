import { Schema } from "mongoose";

const debtSchema = new Schema(
  {
    amount: { type: Number, required: true },
    debitors: { type: [], required: true },
    creditors: { type: [], required: true },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default debtSchema;
