import {
  validateRequest,
  errorHandler,
  RequestValidationError,
  DatabaseConnectionError,
  BadRequestError,
} from "@wegotickets/common";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../../config";

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }
    const user = User.build({ email, password });
    await user
      .save()
      .then(() => {
        console.log(`User created: ${user.email}`);
      })
      .catch((err) => {
        throw new DatabaseConnectionError();
      });

    // Generate JWT
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY is not defined");
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY
      // config.secret
    );
    console.log(process.env.JWT_KEY, userJwt);

    // // Store the user id in a JWT token
    // req.session = {
    //   jwt: userJwt
    // };
    res.cookie("jwt", userJwt);

    res.status(201).send(user);
  }
);

export { router as signupRouter };
