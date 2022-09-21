import { Subjects } from "@wegotickets/common";
import Publisher from "@wegotickets/common/build/events/_publisher";
// import TicketUpdatedEvent from "@wegotickets/common/build/events/_ticketUpdatedEvent";

export default class TicketUpdatePublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TickerUpdated = Subjects.TickerUpdated;
}

interface TicketUpdatedEvent {
  subject: Subjects.TickerUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string;
  };
}
