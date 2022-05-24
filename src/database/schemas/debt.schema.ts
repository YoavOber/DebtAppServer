import { Schema } from "mongoose";
import { User } from "../models/user.model";
import { IDebtor } from "../types/IDebtor";
import { Creditor } from "../types/ICreditor";

const debtSchema = new Schema(
  {
    totalAmount: { type: Number, required: true },
    debtors: {
      type: [],
      required: true,
      validate(d: IDebtor[]) {
        if (d.length == 0) throw new Error("Must have at least one debtor");
      },
    },
    creditor: { type: Creditor, ref: User, required: true },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default debtSchema;
