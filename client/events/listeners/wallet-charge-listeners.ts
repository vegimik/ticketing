import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";
import { Subjects } from "@wegotickets/common";
import Listener from "@wegotickets/common/build/events/_listener";

class WalletChargeListeners extends Listener<WalletChargeEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: WalletChargeEvent["data"], msg: Message) {
    const { id, version, deposit, user } = data;

    msg.ack();
  }
}

interface WalletChargeEvent {
  subject: Subjects.PaymentCreated;
  data: {
    id: string;
    version: number;
    deposit: number;
    user: any;
  };
}

export { WalletChargeEvent, WalletChargeListeners };
