import { Request, Response, Router } from "express";
import authController from "../controllers/auth.controller";
import { wrapAndCatch } from "../wrappers/requestWrapper";

const router: Router = Router();
const _controller = new authController();

router.post("/register", (req: Request, res: Response) =>
  wrapAndCatch(async () => await _controller.register(req, res), res)
);
router.post("/login", (req: Request, res: Response) =>
  wrapAndCatch(async () => await _controller.login(req, res), res)
);
router.post("/login/:token", (req: Request, res: Response) =>
  wrapAndCatch(async () => await _controller.loginToken(req, res), res)
);

export { router as authRouter };
