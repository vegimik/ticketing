import jwt from "jsonwebtoken";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

jest.mock("../../nats-wrapper");

let mongo: any;
beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = "secret123456789vk";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
  //   await mongoose.connection.db.dropDatabase();
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongo.stop();
  await mongoose.connection.close();
});

declare global {
  namespace NodeJS {
    export interface Global {
      signin(): string[];
    }
  }
}
declare global {
  var signin: () => string[];
}

global.signin = () => {
  // const payload={
  //   id:'12345678',
  //   email: 'vegimik@gmail.com'
  // }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "vegimik@gmail.com",
  };
  const jwtToken = jwt.sign(payload, process.env.JWT_KEY!);

  const session = {
    jwt: jwtToken,
  };
  const sessionJson = JSON.stringify(session);
  const base64 = Buffer.from(sessionJson).toString("base64");
  return [`express:sess=${base64}`];
};
