// import TicketCreatedEvent from "@wegotickets/common/build/events/_ticketCreatedEvent";
import Listener from "@wegotickets/common/build/events/_listener";
import { Subjects } from "@wegotickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export default class TicketCreatedListeners extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price, version } = data;
    const ticket = await Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
    msg.ack();
  }
}

interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
      id: string;
      title: string;
      price: number;
      userId: string;
      version:number
  };
}

