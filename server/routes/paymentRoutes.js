import express from "express";
import {
  createCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentController.js";
import userAuth from "../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", userAuth, createCheckoutSession);
paymentRouter.post("/webhook", stripeWebhook);

export default paymentRouter;
