import mongoose from "mongoose";
import { OrderStatus } from "../types/order-status";
import { TicketDoc } from "./ticket";
const Schema = mongoose.Schema;

//An intereface that defines the properties of a Order.
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

//An interface that defines the properties of a
//Order Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

//An interface that defines the properties of a
//Order Document has
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

// Define our model
const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    status: { type: String, required: true, 
    enum: Object.values(OrderStatus), default: OrderStatus.Created },
    expiresAt: { type: mongoose.Schema.Types.Date },
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

OrderSchema.statics.build = (arrts: OrderAttrs) => {
  return new Order(arrts);
};

// Create the model class
const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order };
