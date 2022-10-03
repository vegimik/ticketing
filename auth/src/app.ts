import express from "express";
import { json } from "body-parser";
import { errorHandler, NotFoundError } from "@wegotickets/common";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { newRouter } from "./routes/new";
import cookieSession from "cookie-session";
import jwt from "jsonwebtoken";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", //true,
  })
);

app.use(currentUserRouter);
app.use(newRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
