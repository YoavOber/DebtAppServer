import { ObjectId } from "mongoose";
export interface IDebtor {
  user: ObjectId;
  amount: number;
}
