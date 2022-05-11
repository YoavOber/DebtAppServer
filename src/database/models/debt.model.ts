import { model } from "mongoose";
import debtSchema from "../schemas/debt.schema";
import { IDebt } from "../types/IDebt.interface";

export const Debt = model<IDebt>("Debt", debtSchema);
