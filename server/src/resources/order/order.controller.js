//TILL MAIN 
const Order = require('../order/order.model');


const{ initStripe } = require("../../stripe")

const stripe = initStripe()

require("dotenv").config();


const createOrder = async (cart) => {
  try {
    // Create a new order 
    // const newCart = []  
    // for(let i = 0; i < cart.lenght; i++ ) {
    //   newCart.push({productName:cart[i].product.productName, image: cart[i].product.image, price: cart[i].product.price, quantity: cart[i].quantity })
    // }

    const newCart = cart.map((item) => ({

      productName: item.product.productName,
    
      image: item.product.image,
    
      price: item.product.price,
    
      quantity: item.quantity,
    
    }));

    const order = new Order( {cart:newCart} );
    console.log (newCart)

    // Save the order to the database
    await order.save();

    console.log('Order created successfully');


  } catch (error) {
    console.error('Error creating order:', error);
    throw error; 
  }
};


const verifySession = async (req, res) => {
  // try {
    const sessionId = req.body.sessionId;
    const cart = JSON.parse(req.body.cart);

    const updatedSession = await stripe.checkout.sessions.retrieve(sessionId);
console.log(updatedSession);

    await createOrder(cart);
    // Se till att sessionId är en sträng
    // if (typeof sessionId !== 'string') {
    //   throw new Error('Ogiltigt sessionId. Det måste vara en sträng.');
    // }
  
    

  //   if (updatedSession.payment_status === 'succeeded') {
  //     // && updatedSession.payment_intent.status === 'succeeded'
  //     // Betalningen är godkänd, köra createOrder
  
  //     console.log('Betalningen lyckades och order skapades.');
  //   } else {
  //     console.log('Betalningen lyckades inte.');
  //   }
  // } catch (error) {
  //   console.error('Ett fel inträffade i verifySession:', error);
  // }

res.status(200);

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

} catch (error) {
console.error('An error occurred in createStripeCheckoutSession:', error);
res.status(500).json({ message: 'Internal Server Error' });

}

};




module.exports = { createOrder, verifySession, createStripeCheckoutSession };
