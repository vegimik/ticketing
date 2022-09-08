import { Message } from "node-nats-streaming";
import Listener from "./_listener";
import { Subjects } from "./_subject";
import TicketCreatedEvent from "./_ticketCreatedEvent";

export default class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("{TicketCreatedListener}:: Event data!", data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}
