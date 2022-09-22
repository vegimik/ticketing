import { Subjects } from "@wegotickets/common";
import ExpirationCompleteEvent from "@wegotickets/common/build/events/expiration-complete-event";
import Publisher from "@wegotickets/common/build/events/_publisher";



export default class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

}
