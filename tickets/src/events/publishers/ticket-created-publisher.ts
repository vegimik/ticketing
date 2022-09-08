import { Subjects } from "@wegotickets/common";
import Publisher from "@wegotickets/common/build/events/_publisher";
import TicketCreatedEvent from "@wegotickets/common/build/events/_ticketCreatedEvent";


export default class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
