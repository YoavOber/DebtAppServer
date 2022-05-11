import { Document, Model } from "mongoose";
export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {
  validatePassword: (this: IUserDocument, password: string) => Promise<boolean>;
  getAccessToken: (this: IUserDocument) => string; //get token signed and containing id
}
export interface IUserModel extends Model<IUserDocument> {}
