import { response } from "express";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import {natsWrapper} from '../../nats-wrapper';

it("returns the 404 if the provided id does not exist", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put("/api/tickets/"+id)
    .set("Cookie", global.signin())
    .send({
        title: "FibulaTicket",
        price: 1200,
    }).expect(401);
});

it("returns the 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put("/api/tickets/"+id)
    .set("Cookie", global.signin())
    .send({
        title: "FibulaTicket",
        price: 1200,
    }).expect(401);
});

it("returns the 401 if the user does not own the ticket", async () => {
    const response= await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
        title: "FibulaTicket",
        price: 1200,
    });

    await request(app)
    .put("/api/tickets/"+response.body.id)
    .set("Cookie", global.signin())
    .send({
        title: "FibulaTicket",
        price: 1200,
    }).expect(401);
});

it("returns the 400 if the user provide an invalid title or price", async () => {
    const cookie = global.signin();
    const  response =await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
        title: "FibulaTicket",
        price: 1200,
    })
    
    await request (app)
    .put("/api/tickets/"+response.body.id)
    .set("Cookie", cookie)
    .send({
        title: "",
        price: 1200,
    }).expect(400);

    await request (app)
    .put("/api/tickets/"+response.body.id)
    .set("Cookie", cookie)
    .send({
        title: "FibulaTicket",
        price: -200,
    }).expect(400);

});

it("updates the ticket providdd valid inputs", async () => {
    const cookie = global.signin();

    const  response =await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
        title: "FibulaTicket",
        price: 1200,
    }).expect(201);

    await request (app)
    .put("/api/tickets/"+response.body.id)
    .set("Cookie", cookie)
    .send({
        title: "FibulaTicketModified",
        price: 2000,
    }).expect(200);

    const ticketResponse = await request(app)
    .get("/api/tickets/"+response.body.id)
    .send()
    
    expect(ticketResponse.body.title).toEqual("FibulaTicketModified");
    expect(ticketResponse.body.price).toEqual(2000);
});

it("publishes an event", async () => {
    const cookie = global.signin();

    const  response =await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
        title: "FibulaTicket",
        price: 1200,
    }).expect(201);

    await request (app)
    .put("/api/tickets/"+response.body.id)
    .set("Cookie", cookie)
    .send({
        title: "FibulaTicketModified",
        price: 2000,
    }).expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});