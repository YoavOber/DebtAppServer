import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { userExists } from "../repository/user.repository";

export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader) return res.status(401).send("missing authorization header");

  const token = authHeader.split("Bearer ")[1];
  const verified = <any>verify(token, process.env.JWT_SECRET!);
  if (verified.id == null) return res.status(401).send("invalid token");

  const user = await userExists(verified.id);
  if (!user) return res.status(404).send("user doesn't exist");

  next();
};
