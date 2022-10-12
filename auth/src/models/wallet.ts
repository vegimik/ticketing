import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import mongoose from "mongoose";
import { UserDoc } from "./user";
const Schema = mongoose.Schema;

//An intereface that defines the properties of a Order.
interface WalletAttrs {
  id: string;
  version: number;
  deposit: number;
  user: UserDoc;
}

//An interface that defines the properties of a
//Wallet Document has
interface WalletDoc extends mongoose.Document {
  version: number;
  deposit: number;
  user: UserDoc;
}

//An interface that defines the properties of a
//Wallet Model has
interface WalletModel extends mongoose.Model<WalletDoc> {
  build(attrs: WalletAttrs): WalletDoc;
}

// Define our model
const WalletSchema = new Schema(
  {
    deposit: { type: Number, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
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

WalletSchema.statics.build = (attrs: WalletAttrs) => {
  return new Wallet({
    _id: attrs.id,
    version: attrs.version,
    deposit: attrs.deposit,
  });
};

// Create the model class
const Wallet = mongoose.model<WalletDoc, WalletModel>("wallet", WalletSchema);
WalletSchema.set("versionKey", "version");
WalletSchema.plugin(updateIfCurrentPlugin);

export { Wallet };
