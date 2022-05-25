import { FilterQuery } from "mongoose";
import { IDebtDocument } from "../database/types/IDebt";
import DBResponse from "../database/models/DBResponse";
import { IDebtor } from "../database/types/IDebtor";
import { ICreditor } from "../database/types/ICreditor";
import { Creditor, Debtor, Debt } from "../database/models/models";

const create = async (
  totalAmount: number,
  creditor: ICreditor,
  debtors: IDebtor[],
  reason: string
): Promise<DBResponse> => {
  let _creditor: ICreditor = new Creditor({ uid: creditor.uid, username: creditor.username });
  let _debtorsArr: IDebtor[] = debtors.map(
    (e) => new Debtor({ amount: e.amount, uid: e.uid, username: e.username })
  );

  const debt = new Debt({
    totalAmount: totalAmount,
    creditor: _creditor,
    debtors: _debtorsArr,
    reason: reason,
  });

  const result = await debt
    .save()
    .then((d: IDebtDocument) => new DBResponse(true, d))
    .catch((err: Error) => {
      console.log(err);
      return new DBResponse(false, err.message);
    });
  return result;
};

const deleteById = async (id: string): Promise<DBResponse> => {
  const result = await Debt.findByIdAndDelete(id)
    .then((d: IDebtDocument | null) => new DBResponse(true, d))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

const getUser = async (id: string, debits: boolean, credits: boolean): Promise<DBResponse> => {
  if (!credits && !debits)
    return new DBResponse(false, "bad request - no credits or debits are specified");

  let filter: FilterQuery<any>;
  const getCreditsQuery: FilterQuery<any> = {
    "creditor.uid": id,
  };
  const getDebitsQuery: FilterQuery<any> = {
    "debtors.uid": {
      $in: [id],
    },
  };

  console.log(getCreditsQuery, getDebitsQuery);

  if (credits && debits) filter = { $or: [getCreditsQuery, getDebitsQuery] };
  else if (credits && !debits) filter = getCreditsQuery;
  else filter = getDebitsQuery;

  const result = await Debt.find(filter)
    .then((d: IDebtDocument[] | null) => new DBResponse(true, d))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

export { create, deleteById, getUser };
