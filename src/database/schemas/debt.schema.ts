import { Schema } from "mongoose";
import { IDebtor } from "../types/IDebtor";
import debtor from "./debtor.schema";

const debtSchema = new Schema(
  {
    totalAmount: { type: Number, required: true },
    debtors: {
      type: [debtor],
      required: true,
      validate(d: IDebtor[]) {
        if (d.length == 0) throw new Error("Must have at least one debtor");
      },
    },
    creditor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default debtSchema;
