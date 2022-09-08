import { randomBytes } from 'crypto';
import { natsWrapper } from "../nats-wrapper";

export async function mongoDB(mongoose: any) {
  console.log(process.env.ALLUSERSPROFILE);
  console.log(process.env.JWT_KEY);
  // console.log(process.env);
  
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await natsWrapper.connect('ticketing', randomBytes(4).toString("hex"), 'http://nats-srv:4222');
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb!");
  } catch (error) {
    console.log(error);
  }
}
