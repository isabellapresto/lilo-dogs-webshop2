const Order = require('../order/order.model');


const{ initStripe } = require("../../stripe")

const stripe = initStripe()

require("dotenv").config();


const createOrder = async (cartItems, sessionId) => {
  try {
    // Create a new order 
    const order = new Order({ cart: cartItems, sessionId });

    // Save the order to the database
    await order.save();

    console.log('Order created successfully');


  } catch (error) {
    console.error('Error creating order:', error);
    throw error; 
  }
};

const verifySession = async (sessionId) => {
  try {
    // Se till att sessionId är en sträng
    if (typeof sessionId !== 'string') {
      throw new Error('Ogiltigt sessionId. Det måste vara en sträng.');
    }

    const updatedSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (updatedSession.payment_status === 'paid' && updatedSession.payment_intent.status === 'succeeded') {
      // Betalningen är godkänd, köra createOrder
      await createOrder(updatedSession.cart, sessionId);
      console.log('Betalningen lyckades och order skapades.');
    } else {
      console.log('Betalningen lyckades inte.');
    }
  } catch (error) {
    console.error('Ett fel inträffade i verifySession:', error);
  }
};


// Funktion skapa en Checkout-session med Stripe
const createStripeCheckoutSession = async (req, res) => {
  try{
 


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
    shipping_address_collection: {
      allowed_countries: ['SE', 'US'],
    },
   
  });
  console.log('Created Stripe session:', session);

res.json(session);

await verifySession(String(session.id));

} catch (error) {
console.error('An error occurred in createStripeCheckoutSession:', error);
res.status(500).json({ message: 'Internal Server Error' });

}

};




module.exports = { createOrder, verifySession, createStripeCheckoutSession };
