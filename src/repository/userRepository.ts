import DBResponse from "../models/DBResponse.model";
import { User } from "../schemas/userSchema.mongo";
import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interfaces/IUser.interface";

const getUserJWT = (user: IUser) => {
  const payload = {
    id: user.id,
  };
  return sign(payload, process.env.JWT_SECRET!);
};

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

const jwtLogin = async (token: string): Promise<Boolean> => {
  const uid = getPayload(token);
  const user = await User.findById(uid);
  if (user) return true;
  return false;
};

export { register, login, jwtLogin };
