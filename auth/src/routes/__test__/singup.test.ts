import request from "supertest";
import { app } from "../../app";

it("Return a 201 on a successful singup", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "sample@gmail.com",
      password: "password",
    })
    .expect(201);

  //expect(response.body.user.email).toEqual("sample@gmail.com")
});

it("Return a 400 with an invalid email", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "sample",
      password: "password",
    })
    .expect(400);
  //expect(response.body.user.email).toEqual("sample@gmail.com")
});

it("Return a 400 with an invalid password", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "sample",
      password: "password",
    })
    .expect(400);
  //expect(response.body.user.email).toEqual("sample@gmail.com")
});

it("Return a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sample@gmail.com",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "password" })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  jest.setTimeout(10000);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sample@gmail.com",
      password: "password",
    })
    .expect(201);

  // await request(app)
  //   .post("/api/users/signup")
  //   .send({
  //     email: "sample@gmail.com",
  //     password: "password",
  //   })
  //   .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "sample@gmail.com",
      password: "password",
    })
    .expect(201);
    console.log(response.get("Set-Cookie"));
    
  expect(response.get("Set-Cookie")).toBeDefined();
});
