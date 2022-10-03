import {
  validateRequest,
  DatabaseConnectionError,
  BadRequestError,
} from "@wegotickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users",
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

    res.status(201).send(user);
  }
);

export { router as newRouter };
