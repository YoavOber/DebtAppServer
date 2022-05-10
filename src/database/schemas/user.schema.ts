import { Schema } from "mongoose";
import { hash, compare, genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUserDocument } from "../types/IUser.interface";

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
  const user: IUserDocument = this;
  if (user.isModified("password")) user.password = await hash(user.password, 0);
  next();
});

userSchema.methods.validatePassword = async function (password: string) {
  const result = await compare(password, this.password);
  return result;
};

userSchema.methods.getToken = function () {
  const payload = {
    id: this.id,
  };
  return sign(payload, process.env.JWT_SECRET!);
};

export default userSchema;
