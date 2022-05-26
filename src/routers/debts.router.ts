import { Request, Response, Router } from "express";
import DebtController from "../controllers/debt.controller";
import { isUser } from "../middlewares/auth";
import { deleteCache } from "../middlewares/cache";
import { wrapAndCatch } from "../wrappers/requestWrapper";

const router: Router = Router();
const _controller = new DebtController();

if (process.env.ENV == "prod") router.use(isUser);

router.post("/create", deleteCache, (req: Request, res: Response) =>
  wrapAndCatch(async () => await _controller.createDebt(req, res), res)
);
router.delete("/delete/:id", deleteCache, (req: Request, res: Response) =>
  wrapAndCatch(async () => await _controller.deleteDebt(req, res), res)
);
router.get("/userdata/:id", (req: Request, res: Response) =>
  wrapAndCatch(async () => await _controller.getUserData(req, res), res)
);

export { router as debtRouter };
