import { Schema } from "mongoose";
import { userExists } from "../../repository/user.repository";
import { IDebtor } from "../types/IDebtor";

export const debtorSchema = new Schema<IDebtor>(
  {
    uid: {
      type: String,
      required: true,
      validate: async (uid: string) => {
        const exists = await userExists(uid);
        if (!exists) throw new Error(`user id ${uid} not found in DB`);
      },
    },
    username: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);
