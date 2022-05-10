import DBResponse from "../models/DBResponse.model";
import { verify } from "jsonwebtoken";
import { IUserDocument } from "../database/types/IUser.interface";
import { User } from "../database/models/user.model";

const getPayload = (token: string) => {
  const verified = <any>verify(token, process.env.JWT_SECRET!);
  return verified.id;
};

//register
//return jwt with user data if succuess
//else return error message
const register = async (username: string, email: string, password: string): Promise<DBResponse> => {
  const usernameExists = await User.findOne({ username: username });
  if (usernameExists != null) return new DBResponse(false, "שם משתמש כבר קיים במערכת");
  const user: IUserDocument = new User({ username: username, email: email, password: password });
  return await user
    .save()
    .then((u: IUserDocument) => new DBResponse(true, u.getToken()))
    .catch((err: Error) => new DBResponse(false, err.message));
};

//return jwt with user data if user exists
//else return error data
const login = async (username: string, password: string): Promise<DBResponse> => {
  const user: IUserDocument | null = await User.findOne({ username: username });
  if (user == null) return new DBResponse(false, "משתמש לא נמצא");

  const passCorrect: boolean = await user.validatePassword(password);
  return new DBResponse(passCorrect, passCorrect ? user.getToken() : "סיסמא שגויה");
};

const jwtLogin = async (token: string): Promise<Boolean> => {
  const uid = getPayload(token);
  const user = await User.findById(uid);
  return user != null;
};

export { register, login, jwtLogin };
