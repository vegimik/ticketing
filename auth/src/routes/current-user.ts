import express from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../services/passport";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, async (req, res) => {
  
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
