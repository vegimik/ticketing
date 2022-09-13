import express from "express";

const router = express.Router();

router.get("/api/orders",  (req, res) => {
    res.send("Hi there!");
  });

  router.get("/api/orders/:orderId",  (req, res) => {
    res.send("Hi there!");
  });

export { router as getOrderRouter };
