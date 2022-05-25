import { Schema } from "mongoose";
import { userExists } from "../../repository/user.repository";
import { ICreditor } from "../types/ICreditor";

export const creditorSchema = new Schema<ICreditor>(
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
  },
  { _id: false }
);
