import { Response, Request } from "express";
import { create } from "../repository/debt.repository";
class DebtController {
  async createDebt(req: Request, res: Response) {
    try {
      const { amount, creditors, debitors, reason } = req.body;
      const result = await create(amount, creditors, debitors, reason);
      return res.status(result.success ? 200 : 400).send(result.data);
    } catch (error: Error | any) {
      const errMsg: string = error instanceof Error ? error.message : String(error);
      return res.status(500).send(errMsg);
    }
  }
}

export default DebtController;
