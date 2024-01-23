const Order = require('../order/order.model');


const{ initStripe } = require("../../stripe")

const stripe = initStripe()

require("dotenv").config();


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
      allowed_countries: ['US', 'CA', 'GB', 'SE'], // Specify the allowed countries for shipping
    },

   
  });
  console.log('Created Stripe session:', session);
// Call createOrder function to save the order to the database
await createOrder(req.body.cartItems, session.id);

res.json(session);

} catch (error) {
console.error('An error occurred in createStripeCheckoutSession:', error);
res.status(500).json({ message: 'Internal Server Error' });
}
};

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


module.exports = { createOrder, createStripeCheckoutSession };
