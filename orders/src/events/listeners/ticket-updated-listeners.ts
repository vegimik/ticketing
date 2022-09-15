import TicketCreatedEvent from "@wegotickets/common/build/events/_ticketCreatedEvent";
import Listener from "@wegotickets/common/build/events/_listener";
import { Subjects } from "@wegotickets/common";
import { Message } from "node-nats-streaming";
import TicketUpdatedEvent from "@wegotickets/common/build/events/_ticketUpdatedEvent";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export default class TicketUpdatedListeners extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TickerUpdated = Subjects.TickerUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
