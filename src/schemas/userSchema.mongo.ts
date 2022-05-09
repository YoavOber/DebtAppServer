import { model, Schema } from "mongoose";
import { hash, compare } from "bcrypt";
import { IUser } from "../interfaces/IUser.interface";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    validate: (p: String) => {
      if (p.length < 8) throw new Error("password too short, min 8 characters");
    },
  },
});

userSchema.pre<IUser>("save", async function (next: Function) {
  const user = this;
  if (user.isModified("password")) user.password = await hash(user.password, 8);
  next();
});

userSchema.methods.validateHash = async function (hash: string) {
  return await compare(this.password, hash);
};

export const User = model<IUser>("User", userSchema);
