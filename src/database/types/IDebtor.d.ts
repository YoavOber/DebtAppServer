import { Types } from "mongoose";
export interface IDebtor {
  uid: String; //Types.ObjectId;
  username: string;
  amount: number;
}
