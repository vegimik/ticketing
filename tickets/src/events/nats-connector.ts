import { randomBytes } from "crypto";

export default async function natsConnector(natsWrapper: any) {
  try {
    await natsWrapper.connect(
      "ticketing",
      randomBytes(4).toString("hex"),
      "http://nats-srv:4222"
    );
    natsWrapper.client.on("close", () => {
      console.log("Listener diconnected from NATS!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
  } catch (error) {
    console.error(error);
  }
}
