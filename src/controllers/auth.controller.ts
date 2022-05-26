import { Request, Response } from "express";
import DBResponse from "../database/models/DBResponse";
import { register, login, jwtLogin } from "../repository/user.repository";

class authController {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const dbResponse: DBResponse = await register(username, email, password);
    return res.status(dbResponse.success ? 200 : 400).send(dbResponse.data);
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const result = await login(username, password);
    return res.status(result.success ? 200 : 404).send(result.data);
  }

  async loginToken(req: Request, res: Response) {
    const token: string = req.params.token;
    const result: DBResponse = await jwtLogin(token);
    return res.status(result.success ? 200 : 404).send(result.data);
  }
}

export default authController;
