import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { OrderStatus } from "@wegotickets/common";
import {
  OrderCancelledEvent,
  OrderCancelledListener,
} from "../order-cancelled-listener";

const setup = async () => {
  //create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  //create and save a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "asdf",
  });
  ticket.set({ orderId });
  await ticket.save();

  //create a fake data event
  const data: OrderCancelledEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  //create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, orderId, msg };
};

it("updates the ticket, publishes an event, and acks the message", async () => {
  const { listener, ticket, data, orderId, msg } = await setup();
  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(data.ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
