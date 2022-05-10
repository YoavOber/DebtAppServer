import { Document, Model } from "mongoose";
export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {
  validateHash: (this: IUserDocument, password: string) => Promise<boolean>;
  getToken: (this: IUserDocument) => string;
}
export interface IUserModel extends Model<IUserDocument> {}
