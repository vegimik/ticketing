import { Subjects } from "@wegotickets/common";
// import OrderCancelledEvent from "@wegotickets/common/build/events/_orderCancelledEvent";
import Publisher from "@wegotickets/common/build/events/_publisher";

export default class OrderCacelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

interface OrderCancelledEvent extends Event {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}

