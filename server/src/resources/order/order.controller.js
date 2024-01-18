const Order = require('../order/order.model');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const createOrder = async (req, res) => {
  try {
    const { cart } = req.body;

    // Skapa en Checkout-session med Stripe och få tillbaka sessionId
    const session = await createStripeCheckoutSession(cart);

    // Skapa en ny order baserad på varukorgen
    const order = new Order({ cart });
    await order.save();

    // Skicka tillbaka sessionId som en del av JSON-svaret
    res.json({ sessionId: session.id, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Funktion skapa en Checkout-session med Stripe
const createStripeCheckoutSession = async (cart) => {
  // Anropa Stripe API för att skapa en Checkout-session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cart.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.productName,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'http://localhost:5173/success', 
   
  });

  return session;
};

module.exports = { createOrder, createStripeCheckoutSession };
