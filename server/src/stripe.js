require("dotenv").config();

const initStripe = () => {
 const Stripe = require ("stripe");
 console.log("Stripe key", process.env.STRIPE_KEY)
 return Stripe(process.env.STRIPE_KEY);
};

module.exports = { initStripe }






// const express = require('express');
// // const app = express();
// const Stripe = require('stripe')

// require("dotenv").config();

// const stripe = Stripe(process.env.STRIPE_KEY)

// const router = express.Router();

// router.post('/create-checkout-session', async (req, res) => {
//  const session = await stripe.checkout.sessions.create({
//    line_items: [
//      {
//        price_data: {
//          currency: 'usd',
//          product_data: {
//            name: 'T-shirt',
//          },
//          unit_amount: 2000,
//        },
//        quantity: 1,
//      },
//    ],
//    mode: 'payment',
//    success_url: `${process.env.CLIENT_URL}/checkout-success`,
//    cancel_url: `${process.env.CLIENT_URL}/cart`,
//  });

//  res.send({url: session.url});
// });

// module.exports = router;



// VIDEO
// const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// router.post("/payment", (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "€",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

// module.exports = router;