import request from "supertest";
import { app } from "../app";

it("fails when a email that does not exist is supplied", async () => {
  const response = await request(app).post("/api/users/signin").send({
    email: "sample@gmail.com",
    password: "password",
  });
  console.log("====================================");
  console.log(response.body);
  console.log("====================================");
});

it("fails when an incorrect password is supplied", async () => {
  jest.setTimeout(100000);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sample@gmail.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "sample@gmail.com",
      password: "password1",
    })
    .expect(400);
});

it("response with a cookie when given valid credentials", async () => {
  jest.setTimeout(100000);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sample@gmail.com",
      password: "password",
    })
    .expect(201);
  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "sample@gmail.com",
      password: "password",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
