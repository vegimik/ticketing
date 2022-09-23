import { Message } from "node-nats-streaming";
import { Subjects } from "@wegotickets/common";
import Listener from "@wegotickets/common/build/events/_listener";
import { queueGroupName } from "./queue-group-name";
import OrderCreatedEvent from "@wegotickets/common/build/events/_orderCreatedEvent";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}
