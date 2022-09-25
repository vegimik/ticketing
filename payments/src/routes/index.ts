import express from "express";
import { app } from "../app";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@wegotickets/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/payments", async (req, res) => {
  const order = await Order.find();
  res.send({ data: JSON.stringify(order) });
});

export { router as getAllPayments };
