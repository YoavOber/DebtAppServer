import { Debt } from "../database/models/debt.model";
import { IDebtDocument } from "../database/types/IDebt.interface";
import DBResponse from "../models/DBResponse.model";
import { FilterQuery } from "mongoose";
const create = async (
  amount: number,
  creditors: string[],
  debitors: string[],
  reason: string
): Promise<DBResponse> => {
  const debt = new Debt({
    amount: amount,
    creditors: creditors,
    debitors: debitors,
    reason: reason,
  });

  const result = await debt
    .save()
    .then((d: IDebtDocument) => new DBResponse(true, d.toJSON()))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

const deleteById = async (id: string): Promise<DBResponse> => {
  const result = await Debt.findByIdAndDelete(id)
    .then((d: IDebtDocument | null) => new DBResponse(true, null))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

const getUser = async (id: string, debits: boolean, credits: boolean): Promise<DBResponse> => {
  // let query = {};

  const result = await Debt.find();
};

export { create, deleteById, getUser };
