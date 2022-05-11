import { Response, Request } from "express";
import mongoose from "mongoose";
import { create } from "../repository/debt.repository";
class DebtController {
  async createDebt(req: Request, res: Response) {
    try {
      const { amount, date, creditors, debitors, reason } = req.body;
      const dateObject = new mongoose.Schema.Types.Date(date);
      const result = await create(amount, dateObject, creditors, debitors, reason);
      return res.status(result.success ? 200 : 400).send(result.data);
    } catch (error: Error | any) {
      const errMsg: string = error instanceof Error ? error.message : String(error);
      return res.status(500).send(errMsg);
    }
  }
}

export default DebtController;
