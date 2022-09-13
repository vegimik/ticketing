import express from "express";

const router = express.Router();

router.delete("/api/orders/:orderId", (req, res) => {
  res.send("Hi there!");
});

export { router as deleteOrderRouter };
