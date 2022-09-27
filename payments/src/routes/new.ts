import {
  requireAuth,
  validateRequest,
  NotAuthorizedError,
  OrderStatus,
  BadRequestError,
} from "@wegotickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripeClient } from "../stripe";
import { Payment } from "../models/payment";
import PaymentCreatedPublisher from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { OrderCreatedListener } from "../events/listeners/order-created-listeners";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }

    // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
    const charge = await stripeClient.charges.create({
      amount: order.price * 100,
      currency: "usd",
      source: token,
      description:
        "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();


    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });
    

    res.status(201).send({ success: true });
  }
);

export { router as createChargeRouter };
