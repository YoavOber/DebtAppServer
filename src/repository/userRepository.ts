import DBResponse from "../models/DBResponse.model";
import { User } from "../database/schemas/user.schema";
import { verify } from "jsonwebtoken";
import { IUserDocument } from "../database/types/IUser.interface";

const getPayload = (token: string) => {
  const verified = <any>verify(token, process.env.JWT_SECRET!);
  return verified.id;
};

//register
//return jwt with user data if succuess
//else return error message
const register = async (username: string, email: string, password: string): Promise<DBResponse> => {
  const emailExists = await User.findOne({ email: email });
  if (emailExists != null) return new DBResponse(false, "מייל כבר קיים במערכת");
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

  const passCorrect: boolean = await user.validateHash(password);
  return new DBResponse(passCorrect, passCorrect ? user.getToken() : "סיסמא שגויה");
};

const jwtLogin = async (token: string): Promise<Boolean> => {
  const uid = getPayload(token);
  const user = await User.findById(uid);
  if (user) return true;
  return false;
};

export { register, login, jwtLogin };
