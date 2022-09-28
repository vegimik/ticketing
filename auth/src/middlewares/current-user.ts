import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import parseJwtFromCookies from "../helpers/parseJwtFromCookies";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var jwtParsed = parseJwtFromCookies(req);
  if (!jwtParsed) {
    //!req.session?.jwt) {
    return next();
  }

  try {

    const payload = jwt.verify(
      jwtParsed, // req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
