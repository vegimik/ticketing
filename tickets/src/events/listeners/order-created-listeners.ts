import { Message } from "node-nats-streaming";
import { OrderStatus, Subjects } from "@wegotickets/common";
import Listener from "@wegotickets/common/build/events/_listener";
// import OrderCreatedEvent from "@wegotickets/common/build/events/_orderCreatedEvent";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import TicketUpdatePublisher from "../publishers/ticket-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    //if no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    //mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });
    await ticket.save();

    new TicketUpdatePublisher(natsWrapper.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}

interface OrderCreatedEvent extends Event {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}

export { OrderCreatedEvent };
