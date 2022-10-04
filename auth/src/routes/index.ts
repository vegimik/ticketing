import {
  validateRequest,
  DatabaseConnectionError,
  BadRequestError,
} from "@wegotickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new BadRequestError("User does not exists");
  }
  res.status(201).send(existingUser);
});

export { router as indexUserRouter };
