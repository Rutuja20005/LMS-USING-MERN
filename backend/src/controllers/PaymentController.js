import Stripe from "stripe";

export async function createPaymentIntent(req, res) {
  try {
    const { amount } = req.body; // amount in cents (e.g., $10 => 1000)
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: "usd", // ✅ keep only one currency
      automatic_payment_methods: { enabled: true },
    });

    console.log("Payment Intent:", paymentIntent);

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
