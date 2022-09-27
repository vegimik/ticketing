import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import mongoose from "mongoose";
import { OrderStatus } from "@wegotickets/common";
const Schema = mongoose.Schema;

//An intereface that defines the properties of a Order.
interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

//An interface that defines the properties of a
//Payment Document has
interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
  // version: number;
}

//An interface that defines the properties of a
//Payment Model has
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

// Define our model
const PaymentSchema = new Schema(
  {
    orderId: { type: String, required: true },
    stripeId: { type: String, required: true },
    // version: { type: Number, required: true },
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

// Create the model class
const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  PaymentSchema
);

PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment({
    orderId: attrs.orderId,
    stripeId: attrs.stripeId,
  });
};
// PaymentSchema.set("versionKey", "version");
// PaymentSchema.plugin(updateIfCurrentPlugin);

export { Payment };
