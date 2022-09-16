import express from "express";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, async (req, res) => {
  console.log('currentUser: ', currentUser);
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
