import { model } from "mongoose";
import debtSchema from "../schemas/debt.schema";
import { IDebt } from "../types/IDebt";

export const Debt = model<IDebt>("Debt", debtSchema, "Debt");
