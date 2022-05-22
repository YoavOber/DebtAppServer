import { Schema } from "mongoose";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUserDocument } from "../types/IUser";

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

userSchema.virtual("credits", {
  ref: "Debt",
  localField: "_id",
  foreignField: "creditor",
});

// userSchema.virtual('debits',{
//   ref:'Debt',
//   localField:'_id',
//   foreignField:'debitors',
//   match:
// });

userSchema.pre("save", async function (next: Function) {
  const user: IUserDocument = this;
  if (user.isModified("password")) user.password = await hash(user.password, 0);
  next();
});

userSchema.methods.validatePassword = async function (password: string) {
  const result = await compare(password, this.password);
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
