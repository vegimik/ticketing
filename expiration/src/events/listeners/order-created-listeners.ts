import { Message } from 'node-nats-streaming';
import { Subjects } from "@wegotickets/common";
import Listener from "@wegotickets/common/build/events/_listener";
import OrderCreatedEvent from "@wegotickets/common/build/events/_orderCreatedEvent";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("Waiting this many milliseconds to process the job:", delay);
    await expirationQueue.add(
      {
        orderId: data.id,
      }
      // {
      //   delay
      // }
    );

    msg.ack();
  }
}
