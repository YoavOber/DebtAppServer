import { Request, Response } from "express";
import DBResponse from "../models/DBResponse.model";
import { register, login, jwtLogin } from "../repository/userRepository";

class authController {
  async register(req: Request, res: Response) {
    try {
      const body = req.body;
      const username: string = body["username"];
      const email: string = body["email"];
      const password: string = body["password"];
      const dbResponse: DBResponse = await register(username, email, password);
      return res.status(dbResponse.success ? 200 : 400).send(dbResponse.data);
    } catch (error: Error | any) {
      const errMsg: string = error instanceof Error ? error.message : String(error);
      res.status(500).send(errMsg);
    }
  }
  async login(req: Request, res: Response) {
    try {
      const body = req.body;
      const username: string = body["username"];
      const password: string = body["password"];
      await login(username, password)
        .then((v: DBResponse) => res.status(v.success ? 200 : 400).send(v.data))
        .catch((err: Error) => res.status(400).send(err.message));
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async loginToken(req: Request, res: Response) {
    const token: string = req.params.token;
    const verified: Boolean = await jwtLogin(token);
    if (verified) return res.status(200).send("OK");
    return res.status(404).send("User not found");
  }
}

export default authController;
