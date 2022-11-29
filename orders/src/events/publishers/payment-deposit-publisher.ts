import { OrderStatus, Subjects } from "@wegotickets/common";
import PaymentCreatedEvent from "@wegotickets/common/build/events/payment-created-event";
import OrderCreatedEvent from "@wegotickets/common/build/events/_orderCreatedEvent";
import Publisher from "@wegotickets/common/build/events/_publisher";

export default class PaymentDepositPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

//  interface PaymentDepositEvent extends Event {
//   subject: Subjects.PaymentDepsit;
//   data: {
//     id: string;
//     version: number;
//     status: OrderStatus;
//     userId: string;
//     expiresAt: string;
//     ticket: {
//       id: string;
//       price: number;
//     };
//   };
// }
//  enum Subjects {
//   TicketCreated = "ticket:created",
//   TickerUpdated = "ticket:updated",

//   OrderCreated = "order:created",
//   OrderCancelled = "order:cancelled",
//   OrderAwaitingPayment = "order:awaiting:payment",
//   OrderComplete = "order:complete",

//   ExpirationComplete = "expiration:complete",

//   PaymentCreated = "payment:created",
//   PaymentDepsit = "payment:despoit",
// }
