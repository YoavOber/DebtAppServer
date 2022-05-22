import mongoose from "mongoose";

const debtParticipantSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
});

export default debtParticipantSchema;
