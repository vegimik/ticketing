import express from "express";
import { json } from "body-parser";
import { errorHandler, NotFoundError } from "@wegotickets/common";
import cookieSession from "cookie-session";
import jwt from "jsonwebtoken";
import { currentUser } from "./middlewares/current-user";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", //true,
  })
);

app.use(currentUser);


app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
