// import TicketCreatedEvent from "@wegotickets/common/build/events/_ticketCreatedEvent";
import Listener from "@wegotickets/common/build/events/_listener";
import { Subjects } from "@wegotickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export default class TicketUpdatedListeners extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TickerUpdated = Subjects.TickerUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price, version } = data;
    const ticket = await Ticket.findByEvent({
      id: id,
      version: version - 1,
    });
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    ticket.set({ title, price, version });
    await ticket.save();
    msg.ack();
  }
}

interface TicketUpdatedEvent {
  subject: Subjects.TickerUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
  };
}

export { TicketUpdatedEvent };
