import { Debt } from "../database/models/debt.model";
import { IDebtDocument } from "../database/types/IDebt.interface";
import DBResponse from "../models/DBResponse.model";

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
  const getCreditsQuery = {
    creditors: {
      $in: [id],
    },
  };
  const getDebitsQuery = {
    debitors: {
      $in: [id],
    },
  };
  let query;
  if (credits && !debits) query = getCreditsQuery;
  else if (!credits && debits) query = getDebitsQuery;
  else query = { $or: [getCreditsQuery, getDebitsQuery] };

  const result = await Debt.find(query)
    .then((d: IDebtDocument[] | null) => new DBResponse(true, d))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

export { create, deleteById, getUser };
