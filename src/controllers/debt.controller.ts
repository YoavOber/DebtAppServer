import { Response, Request } from "express";
import { create, deleteById, getUser } from "../repository/debt.repository";
class DebtController {
  async createDebt(req: Request, res: Response) {
    try {
      const { totalAmount, creditor, debtors, reason } = req.body;
      const result = await create(totalAmount, creditor, debtors, reason);
      return res.status(result.success ? 200 : 400).send(result.data);
    } catch (error: Error | any) {
      const errMsg: string = error instanceof Error ? error.message : String(error);
      return res.status(500).send(errMsg);
    }
  }

  async deleteDebt(req: Request, res: Response) {
    try {
      const uid = req.params.id;
      const result = await deleteById(uid);
      return res.status(result.success ? 200 : 400).send(result.data);
    } catch (error: Error | any) {
      const errMsg: string = error instanceof Error ? error.message : String(error);
      return res.status(500).send(errMsg);
    }
  }

  //get user credits and/or debits
  //if specified - get only what is specified
  //else - get credits AND debits (default)
  async getUserData(req: Request, res: Response) {
    try {
      const uid = req.params.id;
      const { debits, credits } = req.query;

      const result = await getUser(uid, debits != "false", credits != "false");
      return res.status(result.success ? 200 : 400).send(result.data);
    } catch (error: Error | any) {
      const errMsg: string = error instanceof Error ? error.message : String(error);
      return res.status(500).send(errMsg);
    }
  }
}

export default DebtController;
