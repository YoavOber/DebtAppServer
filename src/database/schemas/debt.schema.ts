import mongoose, { Schema } from "mongoose";

const debtSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: mongoose.Schema.Types.Date, required: true },
  debitors: { type: [], required: true },
  creditors: { type: [], required: true },
  reason: { type: String, required: true },
});

export default debtSchema;
