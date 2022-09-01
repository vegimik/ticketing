import mongoose from "mongoose";
import { app } from "./app";
import { mongoDB } from "./db/mongodb";

mongoDB(mongoose);

app.listen(3000, () => {
  console.log("listening on port 3000!!!");
});

