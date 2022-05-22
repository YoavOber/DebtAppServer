import { Request } from "express";
import { Response } from "express";
import { Router } from "express";
import DebtController from "../controllers/debt.controller";
import { isUser } from "../middlewares/auth";
import { deleteCache } from "../middlewares/cache";

const router: Router = Router();
const _controller = new DebtController();

router.use(isUser);

router.post(
  "/create",
  deleteCache,
  async (req: Request, res: Response) => await _controller.createDebt(req, res)
);

router.delete(
  "/delete/:id",
  deleteCache,
  async (req: Request, res: Response) => await _controller.deleteDebt(req, res)
);

router.get(
  "/userdata/:id",
  async (req: Request, res: Response) => await _controller.getUserData(req, res)
);

router.get(
  "/credits/:id",
  async (req: Request, res: Response) => await _controller.getUserCredits(req, res)
);

export { router as debtRouter };
