import Stripe from "stripe";

export const stripeClient = new Stripe(process.env.STRIPE_KEY!, {
  // @ts-ignore
  apiVersion: "2020-08-27",
});
