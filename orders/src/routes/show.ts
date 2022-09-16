import express from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@wegotickets/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req, res) => {
  
  const orders = await Order.find({ userId: req.currentUser!.id }).populate(
    "ticket"
  );

  res.status(200).send(orders);
});

router.get("/api/orders/:orderId", requireAuth, async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate("ticket");
  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  res.send(order);
});

export { router as getOrderRouter };
