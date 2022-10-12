import mongoose from "mongoose";
import { PasswordService } from "../services/password";
const Schema = mongoose.Schema;

//An intereface that defines the properties of a user.
interface UserAttrs {
  email: string;
  password: string;
}

//An interface that defines the properties of a
//User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//An interface that defines the properties of a
//User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Define our model
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    }
  }
);

userSchema.statics.build = (arrts: UserAttrs) => {
  return new User(arrts);
};

userSchema.pre("save", async function (done) {
  const user = this;
  if (user.isModified("password")) {
    const hashPassword = await PasswordService.toHash(user.password);
    this.set("password", hashPassword);
  }
  done();
});

// Create the model class
const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

export { UserDoc, User };
