import { model } from "mongoose";
import userSchema from "../schemas/user.schema";
import { IUserDocument } from "../types/IUser.interface";

export const User = model<IUserDocument>("User", userSchema);
