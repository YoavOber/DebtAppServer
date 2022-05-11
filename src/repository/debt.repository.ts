import { Debt } from "../database/models/debt.model";
import { IDebtDocument } from "../database/types/IDebt.interface";
import DBResponse from "../models/DBResponse.model";
import { Date } from "mongoose";

const create = async (
  amount: number,
  date: Date,
  creditors: string[],
  debitors: string[],
  reason: string
): Promise<DBResponse> => {
  const debt = new Debt({
    amount: amount,
    date: date,
    creditors: creditors,
    debitors: debitors,
    reason: reason,
  });
  console.log("repo date", debt);

  const result = await debt
    .save()
    .then((d: IDebtDocument) => new DBResponse(true, d.toJSON()))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

export { create };
