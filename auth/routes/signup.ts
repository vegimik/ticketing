import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorHandler } from "../middlewares/error-handler";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.get("/api/users/getall", (req: Request, res: Response) =>
  User.find({}, function (err: any, users: any) {
    if (err) {
      throw new DatabaseConnectionError();
    }
    res.json(users);
  })
);

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
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }
    const user = User.build({ email, password });
    user
      .save()
      .then(() => {
        res.status(201).send(user);
      })
      .catch((err) => {
        throw new DatabaseConnectionError();
      });
  }
);

export { router as signupRouter };
