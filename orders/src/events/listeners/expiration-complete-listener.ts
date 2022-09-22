import { OrderCancelledListener } from "./../../../../tickets/src/events/listeners/order-cancelled-listener";
import { OrderStatus, Subjects } from "@wegotickets/common";
import ExpirationCompleteEvent from "@wegotickets/common/build/events/expiration-complete-event";
import Listener from "@wegotickets/common/build/events/_listener";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";
import OrderCacelledPublisher from "../publishers/order-cancelled-publisher";

export default class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: { orderId: string }, msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();
    new OrderCacelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
