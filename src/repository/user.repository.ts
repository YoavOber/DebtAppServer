import DBResponse from "../database/models/DBResponse";
import { verify } from "jsonwebtoken";
import { IUserDocument } from "../database/types/IUser";
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
    .then((u: IUserDocument) => {
      const data = {
        jwt: u.getUserJWT(),
        loginToken: u.getLoginToken(),
      };
      return new DBResponse(true, data);
    })
    .catch((err: Error) => {
      console.log(err);
      return new DBResponse(false, err.message);
    });

  return result;
};

//return jwt with user data if user exists
//else return error data
const login = async (username: string, password: string): Promise<DBResponse> => {
  const user: IUserDocument | null = await User.findOne({ username: username });
  if (user == null) return new DBResponse(false, "משתמש לא נמצא");

  const passCorrect: boolean = await user.validatePassword(password);
  if (!passCorrect) return new DBResponse(false, "סיסמא שגויה");

  const data = {
    jwt: user.getUserJWT(),
    loginToken: user.getLoginToken(),
  };
  return new DBResponse(true, data);
};

const userExists = async (id: string): Promise<boolean> => {
  const user = await User.findById(id);
  return user != null;
};

const jwtLogin = async (token: string): Promise<DBResponse> => {
  const verified = <any>verify(token, process.env.JWT_SECRET!);
  if (verified.id == null) return new DBResponse(false, "invalid token");

  const user = await User.findById(verified.id);
  if (user == null) return new DBResponse(false, "user not found");

  const data = {
    jwt: user.getUserJWT(),
    loginToken: user.getLoginToken(),
  };
  return new DBResponse(true, data);
};

export { register, login, jwtLogin, userExists };
