import { Subjects } from "@wegotickets/common";
import PaymentCreatedEvent from "@wegotickets/common/build/events/payment-created-event";
import Publisher from "@wegotickets/common/build/events/_publisher";

export default class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
