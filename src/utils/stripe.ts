import * as stripe from "stripe";

// init stripe
const initStripe = new stripe.default(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export default initStripe;
