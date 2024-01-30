const Order = require('../order/order.model');

const{ initStripe } = require("../../stripe")


const stripe = initStripe()

require("dotenv").config();


// const createOrder = async (cart) => {
//   try {
 
//     const newCart = cart.map((item) => ({

//       customer: session.customer_details.name,

//       productName: item.product.productName,
    
//       image: item.product.image,
    
//       price: item.product.price,
    
//       quantity: item.quantity,
    
//     }));

//     const order = new Order( {cart:newCart} );
//     console.log (newCart)

//     // Save the order to the database
//     await order.save();

//     console.log('Order created successfully');


//   } catch (error) {
//     console.error('Error creating order:', error);
//     throw error; 
//   }
// };


const verifySession = async (req, res) => {

    const sessionId = req.body.sessionId;
    const cart = JSON.parse(req.body.cart);

    const updatedSession = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(updatedSession);

       const newCart = cart.map((item) => ({

      customer: updatedSession.customer_details.email,

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





  
res.status(200);

};


// Funktion skapa en Checkout-session med Stripe
const createStripeCheckoutSession = async (req, res) => {
  try{
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.body.email,
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




module.exports = {  verifySession, createStripeCheckoutSession };
