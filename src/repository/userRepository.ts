import DBResponse from "../models/DBResponse.model";
import { User } from "../schemas/userSchema.mongo";
import { sign } from "jsonwebtoken";
import { IUser } from "../interfaces/IUser.interface";

const getUserJWT = (user: IUser) => {
  const payload = {
    username: user.username,
    password: user.password,
    email: user.email,
  };
  return sign(payload, process.env.JWT_SECRET || "");
};

//register
//return jwt with user data if succuess
//else return error message

const register = async (username: string, email: string, password: string): Promise<DBResponse> => {
  const emailExists = await User.find({ email: email });
  if (emailExists) return new DBResponse(false, "מייל כבר קיים במערכת");
  const user: IUser = new User({ username: username, email: email, password: password });
  return await user
    .save()
    .then((u) => new DBResponse(true, getUserJWT(u)))
    .catch((err) => new DBResponse(false, err.message));
};

//return jwt with user data if user exists
//else return error data
const login = async (username: string, password: string): Promise<DBResponse> => {
  const user: IUser | null = await User.findOne({ username: username });
  if (!user) return new DBResponse(false, "משתמש לא נמצא");
  if (user.password != password) return new DBResponse(false, "סיסמא שגויה");
  return new DBResponse(true, getUserJWT(user));
};

export { register, login };
