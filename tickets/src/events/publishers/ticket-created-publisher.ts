import { Subjects } from "@wegotickets/common";
import Publisher from "@wegotickets/common/build/events/_publisher";
// import TicketCreatedEvent from "@wegotickets/common/build/events/_ticketCreatedEvent";


export default class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string;
  };
}

