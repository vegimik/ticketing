import { Subjects } from "@wegotickets/common";
import OrderCreatedEvent from "@wegotickets/common/build/events/_orderCreatedEvent";
import Publisher from "@wegotickets/common/build/events/_publisher";

export default class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
