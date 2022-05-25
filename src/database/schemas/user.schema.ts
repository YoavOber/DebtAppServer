import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Schema } from "mongoose";
import { IUserDocument } from "../types/IUser";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    get: (): undefined => undefined,
    validate: (p: String) => {
      if (p.length < 8) throw new Error("password too short, min 8 characters");
    },
  },
});

userSchema.pre("save", async function (next: Function) {
  const user: IUserDocument = this;
  if (user.isModified("password")) {
    const _hash = await hash(user.toJSON()["password"], 0);
    user.password = _hash;
  }
  next();
});

userSchema.methods.validatePassword = async function (password: string) {
  const result = await compare(password, this.toJSON()["password"]);
  return result;
};

userSchema.methods.getUserJWT = function () {
  const payload = {
    id: this.id,
  };
  return sign(payload, process.env.JWT_SECRET!);
};

userSchema.methods.getLoginToken = function () {
  const payload = {
    id: this.id,
    password: this.password,
  };
  return sign(payload, process.env.JWT_SECRET!);
};

export default userSchema;
