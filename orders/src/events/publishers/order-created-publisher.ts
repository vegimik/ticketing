import { OrderStatus, Subjects } from "@wegotickets/common";
// import OrderCreatedEvent from "@wegotickets/common/build/events/_orderCreatedEvent";
import Publisher from "@wegotickets/common/build/events/_publisher";

export default class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

interface OrderCreatedEvent extends Event {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
