import { Schema } from "mongoose";
import debtParticipantSchema from "./debtParticipant.schema";

const debtSchema = new Schema(
  {
    totalAmount: { type: Number, required: true },
    debitors: { type: [debtParticipantSchema], required: true },
    creditors: { type: [debtParticipantSchema], required: true },
    reason: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default debtSchema;
