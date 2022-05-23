import { Document, Model } from "mongoose";
export interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {
  validatePassword: (this: IUserDocument, password: string) => Promise<boolean>;
  getUserJWT: (this: IUserDocument) => string;
  getLoginToken: (this: IUserDocument) => string;
}
export interface IUserModel extends Model<IUserDocument> {}
