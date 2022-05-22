import { Request, Response } from "express";
import DBResponse from "../database/models/DBResponse";
import { register, login, jwtLogin } from "../repository/user.repository";

class authController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const dbResponse: DBResponse = await register(username, email, password);
      return res.status(dbResponse.success ? 200 : 400).send(dbResponse.data);
    } catch (error: Error | any) {
      const errMsg: string = error instanceof Error ? error.message : String(error);
      return res.status(500).send(errMsg);
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const result = await login(username, password);
      return res.status(result.success ? 200 : 404).send(result.data);
    } catch (error: Error | any) {
      const errMsg: string = error instanceof Error ? error.message : String(error);
      return res.status(500).send(errMsg);
    }
  }

  async loginToken(req: Request, res: Response) {
    try {
      const token: string = req.params.token;
      const result: DBResponse = await jwtLogin(token);
      return res.status(result.success ? 200 : 404).send(result.data);
    } catch (error: Error | any) {
      const errMsg: string = error instanceof Error ? error.message : String(error);
      return res.status(500).send(errMsg);
    }
  }
}

export default authController;
