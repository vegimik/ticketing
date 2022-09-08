import { Message } from "node-nats-streaming";
import Listener from "./_listener";
import Publisher from "./_publisher";
import { Subjects } from "./_subject";
import TicketCreatedEvent from "./_ticketCreatedEvent";

export default class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
