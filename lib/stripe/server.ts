import { env } from "@/env.mjs";
import Stripe from "stripe";

export const stripe = new Stripe(env.NEXT_STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-10-16",
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: "Next.js Subscription Starter",
    version: "0.1.0",
  },
});
