import { app } from "./app";
import natsConnector from "./events/nats-connector";
import { natsWrapper } from "./nats-wrapper";

// mongoDB(mongoose);
natsConnector(natsWrapper);

app.listen(3000, () => {
  console.log("listening on port 3000!!!");
});
