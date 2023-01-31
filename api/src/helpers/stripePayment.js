const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_API_KEY);

const payment = async (amount, payment_method, shipping, currency = "INR") => {
  // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  const paymentIntents = await stripe.paymentIntents.create({
    amount,
    currency,
    description: `Payment by ${shipping.name}`,
    shipping
  });

  if (!paymentIntents?.id) throw new Error("Payment failed");

  const charge = await stripe.paymentIntents.confirm(paymentIntents?.id, { payment_method });

  if (charge?.status === "succeeded") {
    return charge.id;
  } else {
    throw new Error("Error in payment! Please check your card details");
  }
};

module.exports = { payment };
