import { Message, Stan } from "node-nats-streaming";
import Event from "./_event";

export default abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  //   abstract data:T['data'];
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  async publish(data: T["data"]) {
    return new Promise<void>((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log("Event published; ", this.subject );
        resolve();
      });
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
