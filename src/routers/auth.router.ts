import { Router } from "express";
import authController from "../controllers/auth.controller";

const router: Router = Router();
const _controller = new authController(); //TODO - inject!

router.post("/register", _controller.register);
router.post("/login", _controller.login);
router.post("/login/:token", _controller.loginToken);

export { router as authRouter };
