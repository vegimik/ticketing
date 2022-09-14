import { app } from "../../app";
import request from "supertest";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "../../types/order-status";

const buildTicket = async () => {
  const ticket = await Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();
  return ticket;
};

it("marks an order as cancelled", async () => {
  const ticket = await buildTicket();
  const user = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: cancelledOrder } = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  const updatedOrder = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(cancelledOrder.status).toEqual(OrderStatus.Cancelled);
  expect(updatedOrder.body.status).toEqual(OrderStatus.Cancelled);
  expect(cancelledOrder.status).toEqual(updatedOrder.body.status);
});
