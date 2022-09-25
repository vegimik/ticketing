import ExpirationCompleteListener from "./listeners/expiration-complete-listener";
import TicketCreatedListeners from "./listeners/ticket-created-listeners";
import TicketUpdatedListeners from "./listeners/ticket-updated-listeners";

export default async function natsConnector(natsWrapper: any) {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID is not defined");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL is not defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID is not defined");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("Listener diconnected from NATS!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListeners(natsWrapper.client).listen();
    new TicketUpdatedListeners(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
  } catch (error) {
    console.error(error);
  }
}
