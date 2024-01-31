const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  customer: { type: String, required: true },
});
 
const orderSchema = new mongoose.Schema({
  cart: [cartItemSchema],
  orderDate: { type: Date, default: Date.now } 

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
