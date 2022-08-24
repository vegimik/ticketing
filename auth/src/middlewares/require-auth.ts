import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    headers: { cookie },
  } = req;
  const _jwtToken = cookie?.split("=")[1];

  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
