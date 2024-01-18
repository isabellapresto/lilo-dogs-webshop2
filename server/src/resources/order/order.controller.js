const Order = require('../order/order.model');

const{ initStripe } = require("../../stripe")

const stripe = initStripe()

require("dotenv").config();

const createOrder = async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Skapa en Checkout-session med Stripe och få tillbaka sessionId
    const session = await createStripeCheckoutSession(cartItems);

    // Skapa en ny order baserad på varukorgen
    const order = new Order({ cartItems, sessionId: session.id });
    await order.save();

    // Skicka tillbaka sessionId som en del av JSON-svaret
    res.json({ sessionId: session.id, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Funktion skapa en Checkout-session med Stripe
const createStripeCheckoutSession = async (req, res) => {
 


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body.cartItems.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.product.productName,
          images: [item.product.image],
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'http://localhost:5173/success', 
   
  });
console.log(session);
  res.json(session);
};

module.exports = { createOrder, createStripeCheckoutSession };
