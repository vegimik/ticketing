import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;
beforeAll(async () => {
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
      signin(): Promise<string[]>;
    }
  }
}
declare global {
  var signin: () => Promise<string[]>;
}

global.signin = async () => {
  const email = "sample@gmail.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie;
};
