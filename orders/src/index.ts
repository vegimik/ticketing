import mongoose from "mongoose";
import { app } from "./app";
import { mongoDB } from "./db/mongodb";
import natsConnector from "./events/nats-connector";
import { natsWrapper } from "./nats-wrapper";

mongoDB(mongoose);
natsConnector(natsWrapper);

app.listen(3000, () => {
  console.log("Orders, listening on port 3000!!!");
});
