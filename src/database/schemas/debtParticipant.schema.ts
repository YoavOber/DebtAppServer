import mongoose from "mongoose";

const debtParticipantSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userID: { type: mongoose.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
});

export default debtParticipantSchema;
