import { model } from "mongoose";
import debtSchema from "../schemas/debt.schema";
import { IDebt } from "../types/IDebt";
import { creditorSchema } from "../schemas/creditor.schema";
import { ICreditor } from "../types/ICreditor";
import { debtorSchema } from "../schemas/debtor.schema";
import { IDebtor } from "../types/IDebtor";
import userSchema from "../schemas/user.schema";
import { IUserDocument } from "../types/IUser";

// const Creditor = model<ICreditor>("Creditor", creditorSchema);
// const Debtor = model<IDebtor>("Debtor", debtorSchema);
const User = model<IUserDocument>("User", userSchema, "User");
const Debt = model<IDebt>("Debt", debtSchema, "Debt");

export { Debt, User };
