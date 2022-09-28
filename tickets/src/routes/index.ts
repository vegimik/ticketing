import express, { Request, Response } from "express";
import parseJwtFromCookies from "../helpers/parseJwtFromCookies";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  var jwtparsed = parseJwtFromCookies(req);

  res.send(tickets);
});

export { router as indexTicketRouter };
