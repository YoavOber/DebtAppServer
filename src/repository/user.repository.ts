import DBResponse from "../models/DBResponse.model";
import { verify } from "jsonwebtoken";
import { IUserDocument } from "../database/types/IUser.interface";
import { User } from "../database/models/user.model";

//register
//return jwt with user data if succuess
//else return error message
const register = async (username: string, email: string, password: string): Promise<DBResponse> => {
  const usernameExists = await User.findOne({ username: username });
  if (usernameExists != null) return new DBResponse(false, "שם משתמש כבר קיים במערכת");
  const user: IUserDocument = new User({ username: username, email: email, password: password });
  const result = await user
    .save()
    .then(
      (u: IUserDocument) =>
        new DBResponse(true, {
          username: u.username,
          email: u.email,
          token: u.getAccessToken(),
        })
    )
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

//return jwt with user data if user exists
//else return error data
const login = async (username: string, password: string): Promise<DBResponse> => {
  const user: IUserDocument | null = await User.findOne({ username: username });
  if (user == null) return new DBResponse(false, "משתמש לא נמצא");

  const passCorrect: boolean = await user.validatePassword(password);

  if (!passCorrect) return new DBResponse(false, "סיסמא שגויה");
  return new DBResponse(true, {
    username: user.username,
    email: user.email,
    token: user.getAccessToken(),
  });
};

const jwtLogin = async (token: string): Promise<DBResponse> => {
  const verified = <any>verify(token, process.env.JWT_SECRET!);
  console.log(verified);
  const user = await User.findById(verified.id || "");
  if (user == null) return new DBResponse(false, "invalid token");
  return new DBResponse(true, {
    username: user.username,
    email: user.email,
    token: user.getAccessToken(),
  });
};

export { register, login, jwtLogin };
