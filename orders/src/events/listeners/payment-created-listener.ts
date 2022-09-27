import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { OrderStatus, Subjects } from "@wegotickets/common";
import Listener from "@wegotickets/common/build/events/_listener";
import PaymentCreatedEvent from "@wegotickets/common/build/events/payment-created-event";
import { Order } from "../../models/order";

export default class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    order.set({ status: OrderStatus.Complete });
    await order.save();
    msg.ack();
  }
}

export { PaymentCreatedListener };
