import { NotAuthorizedError, NotFoundError } from "@wegotickets/common";
import express from "express";
import { Order } from "../models/order";
import { OrderStatus } from "../types/order-status";

const router = express.Router();

router.delete("/api/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate("ticket");
  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  res.status(204).send(order);
});

export { router as deleteOrderRouter };
