import { Router } from "express";
import DebtController from "../controllers/debt.controller";
import { isUser } from "../middlewares/auth";
import { deleteCache } from "../middlewares/cache";

const router: Router = Router();
const _controller = new DebtController();

if (process.env.ENV == "prod") router.use(isUser);

router.post("/create", deleteCache, _controller.createDebt);
router.delete("/delete/:id", deleteCache, _controller.deleteDebt);
router.get("/userdata/:id", _controller.getUserData);

export { router as debtRouter };
