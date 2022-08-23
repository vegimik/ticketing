import express from "express";
import { json } from "body-parser";
import { errorHandler } from "../middlewares/error-handler";
import { NotFoundError } from "../errors/not-found-error";
import mongoose from "mongoose";
import { mongoDB } from "../db/mongodb";
import { currentUserRouter } from "../routes/current-user";
import { signinRouter } from "../routes/signin";
import { signoutRouter } from "../routes/signout";
import { signupRouter } from "../routes/signup";
import cookieSession from "cookie-session";
import jwt from 'jsonwebtoken';

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

mongoDB(mongoose);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("listening on port 3000!!!");
});
