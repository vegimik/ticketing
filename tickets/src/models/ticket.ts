import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { PasswordService } from "../services/password";
const Schema = mongoose.Schema;

//An intereface that defines the properties of a user.
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
  orderId?:string;
}

//An interface that defines the properties of a
//User Document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?:string;
}

//An interface that defines the properties of a
//User Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// Define our model
const ticketSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
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

ticketSchema.statics.build = (arrts: TicketAttrs) => {
  return new Ticket(arrts);
};

ticketSchema.pre("save", async function (done) {
  const user = this;
  done();
});

// Create the model class
const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

export { Ticket };
