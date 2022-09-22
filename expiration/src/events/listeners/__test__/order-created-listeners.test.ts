import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listeners";

const setup = async () => {
  //create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);
  
  //create a fake message object

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, msg };
};

it("sets the userId of the ticket", async () => {});
