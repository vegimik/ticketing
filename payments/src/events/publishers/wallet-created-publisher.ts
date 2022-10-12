import { Subjects } from "@wegotickets/common";
import Publisher from "@wegotickets/common/build/events/_publisher";

class WalletCreatedPublisher extends Publisher<WalletChargeEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

 interface WalletChargeEvent extends Event {
  subject: Subjects.PaymentCreated;
  data: {
      id: string;
      version: number;
      deposit: number;
      user: any;
  };
}




