import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorHandler } from "../middlewares/error-handler";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
      errorHandler(
        new RequestValidationError(errors.array()),
        req,
        res,
        () => {}
      );
    }

    const { email, password } = req.body;

    console.log("Creating a new user ...");
    throw new DatabaseConnectionError();

    // errorHandler(new Error(), req, res, () => {});

    // res.send({});
  }
);

export { router as signupRouter };
