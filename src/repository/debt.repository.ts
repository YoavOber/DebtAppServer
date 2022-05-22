import { FilterQuery, ObjectId } from "mongoose";
import { Debt } from "../database/models/debt.model";
import { IDebtDocument } from "../database/types/IDebt";
import DBResponse from "../database/models/DBResponse";
import { IDebtParticipant } from "../database/types/IDebtParticipant";
import { User } from "../database/models/user.model";
import { IUserDocument } from "../database/types/IUser";

const create = async (
  totalAmount: number,
  creditor: ObjectId,
  debtors: IDebtParticipant[],
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

const getUserCredits = async (id: string): Promise<DBResponse> => {
  try {
    console.log("here");
    const user: IUserDocument | null = await User.findById(id);
    if (user == null) return new DBResponse(false, "User not found-unable to populate credits");
    console.log(user);
    await user?.populate("credits");
    return new DBResponse(true, user.toJSON()["credits"]);
  } catch (error) {
    return new DBResponse(false, error);
  }
};

//TODO - reimplement
const getUser = async (id: string, debits: boolean, credits: boolean): Promise<DBResponse> => {
  if (!credits && !debits)
    return new DBResponse(false, "bad request - no credits or debits are specified");

  let filter: FilterQuery<any>;
  const getCreditsQuery: FilterQuery<any> = {
    creditor: {
      $in: [id],
    },
  };
  const getDebitsQuery: FilterQuery<any> = {
    debtors: {
      $in: [id],
    },
  };

  if (credits && debits) filter = { $or: [getCreditsQuery, getDebitsQuery] };
  else if (credits && !debits) filter = getCreditsQuery;
  else filter = getDebitsQuery;

  const result = Debt.find(filter)
    .cache()
    .then((d: IDebtDocument[] | null) => new DBResponse(true, d))
    .catch((err: Error) => new DBResponse(false, err.message));
  return result;
};

export { create, deleteById, getUser, getUserCredits };
