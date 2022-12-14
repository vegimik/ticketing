import request from "supertest";
import { app } from "../../app";
import { signupRouter } from "../signup";

// it("response with details about the current user", async () => {
//   const authResponse = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "sample@gmail.com",
//       password: "password",
//     })
//     .expect(201);

//   const cookie = authResponse.get("Set-Cookie");

//   const response = await request(app)
//     .post("/api/users/currentuser")
//     .set("Cookie", cookie)
//     .send()
//     .expect(200);

//   expect(response.body.currentUser.email).toEqual("sample@gmail.com");
// });

it("response with details about the current user, version 2", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  console.log("====================================");
  console.log("res", response.body.currentUser.email);
  console.log("====================================");

  expect(response.body.currentUser.email).toEqual("sample@gmail.com");
});

it("response with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  console.log(response.body);
  expect(response.body.currentUser).toEqual(undefined);
});
