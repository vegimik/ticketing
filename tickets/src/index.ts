import mongoose from "mongoose";
import { app } from "./app";
import { mongoDB } from "./db/mongodb";
import natsConnector from "./events/nats-connector";
import { natsWrapper } from "./nats-wrapper";

mongoDB(mongoose);
console.log('====================================');
console.log('Starting up...', natsWrapper);
console.log('====================================');
natsConnector(natsWrapper);

app.listen(3000, () => {
  console.log("listening on port 3000!!!");
});
