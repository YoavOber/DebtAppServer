import { ObjectId } from "mongoose";
export interface IDebtor {
  uid: ObjectId;
  username: string;
  amount: number;
}
