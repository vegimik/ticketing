import { validateRequest } from './../../../common/src/middlewares/validate-request';
import express, { Request, Response } from "express";
import { app } from "../app";
import { body } from "express-validator";
import { requireAuth } from "@wegotickets/common";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({ success: true });
  }
);



export { router as createChargeRouter };