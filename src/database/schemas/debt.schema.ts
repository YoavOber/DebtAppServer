import { Schema } from "mongoose";
import { creditorSchema } from "./creditor.schema";
import { debtorSchema } from "./debtor.schema";

const debtSchema = new Schema(
  {
    totalAmount: { type: Number, required: true },
    debtors: {
      type: [debtorSchema],
      required: true,
      validate(d: []) {
        if (d.length == 0) throw new Error("Must have at least one debtor");
      },
    },
    creditor: {
      type: creditorSchema,
      required: true,
    },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default debtSchema;
