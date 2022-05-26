import { Response } from "express";

export const wrapAndCatch = function (handler: Function, res: Response) {
  try {
    return handler.call(arguments);
  } catch (error) {
    const errMsg: string = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errMsg);
  }
};
