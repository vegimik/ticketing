import mongoose from "mongoose";
import { mongoDB } from "./db/mongodb";
import { app } from "./app";

mongoDB(mongoose);

app.listen(3000, () => {
  console.log("listening on port 3000!!!");
});
