import Stripe from "stripe";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { planId, userId } = req.body;

    if (!planId || !userId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    let plan, price, credits, desc;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        price = 199;
        credits = 100;
        desc = "Best for personal use.";
        break;
      case "Advanced":
        plan = "Advanced";
        price = 599;
        credits = 400;
        desc = "Best for business use.";
        break;
      case "Business":
        plan = "Business";
        price = 1199;
        credits = 1000;
        desc = "Best for enterprise use.";
        break;

      default:
        return res.json({ success: false, message: "Plan not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY || "inr",
            product_data: {
              name: plan,
              description: desc,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: process.env.CLIENT_URL + "/?payment_status=success",
      cancel_url: process.env.CLIENT_URL + "/buy?payment_status=cancelled",
      metadata: { userId, credits },
    });

    res.json({ success: true, id: session.id });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const stripeWebhook = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const credits = Number(session.metadata.credits);

      await userModel.findByIdAndUpdate(userId, {
        $inc: { creditBalance: credits },
      });
    }

    res.json({ success: true, message: "Payment processed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
