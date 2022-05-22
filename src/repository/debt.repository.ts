import { FilterQuery, ObjectId } from "mongoose";
import { Debt } from "../database/models/debt.model";
import { IDebtDocument } from "../database/types/IDebt";
import DBResponse from "../database/models/DBResponse";
import { IDebtor } from "../database/types/IDebtor";

const create = async (
  totalAmount: number,
  creditor: ObjectId,
  debtors: IDebtor[],
  reason: string
): Promise<DBResponse> => {
  const debt = new Debt({
    totalAmount: totalAmount,
    creditor: creditor,
    debtors: debtors,
    reason: reason,
  });

  const result = await debt
    .save()
    .then((d: IDebtDocument) => new DBResponse(true, d))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

const deleteById = async (id: string): Promise<DBResponse> => {
  const result = await Debt.findByIdAndDelete(id)
    .then((d: IDebtDocument | null) => new DBResponse(true, d))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

//TODO - reimplement
const getUser = async (id: string, debits: boolean, credits: boolean): Promise<DBResponse> => {
  if (!credits && !debits)
    return new DBResponse(false, "bad request - no credits or debits are specified");

  let filter: FilterQuery<any>;
  const getCreditsQuery: FilterQuery<any> = {
    creditor: id,
  };
  const getDebitsQuery: FilterQuery<any> = {
    debtors: {
      $match: [id],
    },
  };

  if (credits && debits) filter = { $or: [getCreditsQuery, getDebitsQuery] };
  else if (credits && !debits) filter = getCreditsQuery;
  else filter = getDebitsQuery;

  const result = await Debt.find(filter)
    // .populate({
    //   path: "debtors.user",
    //   model: "User",
    // })
    .cache()
    .then((d: IDebtDocument[] | null) => new DBResponse(true, d))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

export { create, deleteById, getUser };
