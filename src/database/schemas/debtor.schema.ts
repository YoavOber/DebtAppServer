import mongoose from "mongoose";

const debtor = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
});

export default debtor;
