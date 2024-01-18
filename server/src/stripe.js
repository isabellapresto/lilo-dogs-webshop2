require("dotenv").config();

const initStripe = () => {
 const Stripe = require ("stripe");
 console.log("Stripe key", process.env.STRIPE_KEY)
 return Stripe(process.env.STRIPE_KEY);
};

module.exports = { initStripe }



