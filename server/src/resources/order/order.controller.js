const Order = require('../order/order.model');
const { initStripe } = require("../../stripe")

const stripe = initStripe();

require("dotenv").config();

// Verifiera en Stripe-session och skapa order
const verifySession = async (req, res) => {
  try {
    const sessionId = req.body.sessionId;
    const cart = JSON.parse(req.body.cart);

    // Hämta uppdaterad information om sessionen från Stripe
    const updatedSession = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(updatedSession);

    // Spara i databasen
    const newCart = cart.map((item) => ({
      customer: updatedSession.customer_details.email,
      productName: item.product.productName,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
      orderDate: new Date()
    }));

    // Skapa en ny order 
    const order = new Order({ cart: newCart });
    console.log(newCart);

    // Spara i databasen
    await order.save();

    console.log('Order skapad framgångsrikt');

    res.status(200);
  } catch (error) {
    console.error('Ett fel inträffade vid verifiering av sessionen:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
};

//Stripe Checkout-session
const createStripeCheckoutSession = async (req, res) => {
  try {
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
    
    console.log('Skapade Stripe-session:', session);
    res.json(session);
  } catch (error) {
    console.error('Ett fel inträffade vid skapande av Stripe Checkout-session:', error);
    res.status(500).json({ message: 'Internt serverfel' });
  }
};

// Funktion för att hämta alla ordrar
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().exec();
    console.log('Alla ordrar:', orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Fel vid hämtning av ordrar:', error);
    res.status(500).json({ error: 'Ett fel uppstod vid hämtning av ordrar.' });
  }
}

// Funktion för att hämta alla ordrar för en användare
async function getAllOrdersForUser(req, res) {
  const loggedInUsername = req.params.username;

  try {
    console.log('Försöker hämta ordrar för användare:', loggedInUsername);
    const orders = await Order.find({ 'cart.customer': loggedInUsername }).exec();
    console.log('Alla ordrar för användare', loggedInUsername, ':', orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Fel vid hämtning av ordrar för användare', loggedInUsername, ':', error);
    res.status(500).json({ error: 'Ett fel uppstod vid hämtning av ordrar.' });
  }
}

module.exports = { verifySession, createStripeCheckoutSession, getAllOrders, getAllOrdersForUser };
