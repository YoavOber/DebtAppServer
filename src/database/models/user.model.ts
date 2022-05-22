import { model } from "mongoose";
import userSchema from "../schemas/user.schema";
import { IUserDocument } from "../types/IUser";

export const User = model<IUserDocument>("User", userSchema, "User");
