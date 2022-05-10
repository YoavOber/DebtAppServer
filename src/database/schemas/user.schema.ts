import { model, Schema } from "mongoose";
import { hash, compare } from "bcrypt";
import { IUserDocument } from "../types/IUser.interface";
import { sign } from "jsonwebtoken";

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

userSchema.pre("save", async function (next: Function) {
  const user = this;
  if (user.isModified("password")) user.password = await hash(user.password, 8);
  next();
});

userSchema.methods.validateHash = async function (hash: string) {
  return await compare(this.password, hash);
};

userSchema.methods.getToken = function () {
  const payload = {
    id: this.id,
  };
  return sign(payload, process.env.JWT_SECRET!);
};

export default userSchema;
