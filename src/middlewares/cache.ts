import { NextFunction, Response, Request } from "express";
import { clearCache } from "../cache/redisClient";

export const deleteCache = async (req: Request, res: Response, next: NextFunction) => {
  await next();
  clearCache();
};
