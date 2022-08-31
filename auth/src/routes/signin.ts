import jwt from "jsonwebtoken";
import { PasswordService } from "./../services/password";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  BadRequestError,
  RequestValidationError,
  validateRequest,
} from "@wegotickets/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      throw new BadRequestError("This user does not exist");
    }
    const isPasswordMatching = await PasswordService.compare(
      currentUser.password,
      password
    );
    if (!isPasswordMatching) {
      throw new BadRequestError("Wrong password");
    }
    // Generate JWT
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY is not defined");
    }

    const userJwt = jwt.sign(
      {
        id: currentUser.id,
        email: currentUser.email,
      },
      process.env.JWT_KEY
      // config.secret
    );

    res.cookie("jwt", userJwt);

    res.status(201).send(currentUser);
  }
);

export { router as signinRouter };
