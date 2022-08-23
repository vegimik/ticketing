import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('====================================');
  console.log('Error executing start here');
  console.log('====================================');
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).json({
    message: err.message,
  });
  console.log('Error executing ends here');
  console.log('====================================');
};
