import {
  validateRequest,
  DatabaseConnectionError,
  BadRequestError,
} from "@wegotickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { Wallet } from "../models/wallet";

const router = express.Router();

router.get("/api/users/getall", (req: Request, res: Response) =>
  User.find({}, function (err: any, users: any) {
    if (err) {
      throw new DatabaseConnectionError();
    }
    res.json(users);
  })
);

router.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new BadRequestError("User does not exists");
  }
  res.status(201).send(existingUser);
});

export { router as indexUserRouter };
