import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

const createTicket = async () => {
  await request(app).post(`/api/tickets`).set("Cookie", global.signin()).send({
    title: "FibulaTicket",
    price: 1200,
  });
};

it("catch a featch list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get(`/api/tickets`).send().expect(200);
  expect(response.body.length).toEqual(3);
});
