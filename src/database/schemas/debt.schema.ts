import { Schema } from "mongoose";
import debtParticipantSchema from "./debtParticipant.schema";

const debtSchema = new Schema(
  {
    totalAmount: { type: Number, required: true },
    debtors: { type: [debtParticipantSchema], required: true },
    creditor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default debtSchema;
