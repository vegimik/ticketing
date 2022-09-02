import mongoose from "mongoose";
import { PasswordService } from "../services/password";
const Schema = mongoose.Schema;

//An intereface that defines the properties of a user.
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

//An interface that defines the properties of a
//User Document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

//An interface that defines the properties of a
//User Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}



// Define our model
const userSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    }
  }
);

userSchema.statics.build = (arrts: TicketAttrs) => {
  return new Ticket(arrts);
};

userSchema.pre("save", async function (done) {
  const user = this;
  done();
});

// Create the model class
const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", userSchema);

export { Ticket };
