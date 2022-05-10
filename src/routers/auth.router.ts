import { Router } from "express";
import authController from "../controllers/auth.controller";

const router: Router = Router();
const _controller = new authController(); //TODO - inject!

router.post("/register", async (req, res) => await _controller.register(req, res));
router.post("/login", async (req, res) => await _controller.login(req, res));
router.post("/autologin?token=:token", async (req, res) => await _controller.loginToken(req, res));
// router.post("/logout", async (req, res) => await _controller.logout(req, res));

export { router as authRouter };
