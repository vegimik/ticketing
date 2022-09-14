import { Subjects } from "@wegotickets/common";
import Publisher from "@wegotickets/common/build/events/_publisher";
import TicketUpdatedEvent from "@wegotickets/common/build/events/_ticketUpdatedEvent";

  //TODO: There is a typo in the T class ot Publisher of T. It should be Subjects.TicketCancelled
export default class TicketCacelledPublisher extends Publisher<TicketUpdatedEvent> {
  //TODO: There is a typo in the Subject. It should be Subjects.TicketCancelled
  subject: Subjects.TickerUpdated = Subjects.TickerUpdated;
}
