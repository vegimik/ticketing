import jwt from 'jsonwebtoken';
import {  Request, Response, NextFunction} from "express";

interface UserPayload{
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

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    const {
      headers: { cookie },
    } = req;
    console.log(cookie);
    const _jwtToken = cookie?.split("=")[1];

  if (!_jwtToken) {
    return next();
  }
  
  try {
    const payload = jwt.verify(_jwtToken, process.env.JWT_KEY!) as UserPayload;
    console.log(payload);
    req.currentUser = payload;
  } catch (error) {
    return res.status(500).send({ currentUser: null });
  }

  next();
}