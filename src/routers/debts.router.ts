import { Request } from "express";
import { Response } from "express";
import { Router } from "express";
import DebtController from "../controllers/debt.controller";

const router: Router = Router();
const _controller = new DebtController();

router.post(
  "/create",
  async (req: Request, res: Response) => await _controller.createDebt(req, res)
);

export { router as debtRouter };
