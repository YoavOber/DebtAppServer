import { Schema } from "mongoose";
import { IDebtParticipant } from "../types/IDebtParticipant";
import debtParticipantSchema from "./debtParticipant.schema";

const debtSchema = new Schema(
  {
    totalAmount: { type: Number, required: true },
    debtors: {
      type: [debtParticipantSchema],
      required: true,
      validate(d: IDebtParticipant[]) {
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
