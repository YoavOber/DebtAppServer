import { RequestHandler, Response, Request } from "express";

export const wrapAndCatch = function (handler: RequestHandler, req: Request, res: Response) {
  try {
    return handler.call(arguments, req, res, () => {});
  } catch (error) {
    const errMsg: string = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errMsg);
  }
};
