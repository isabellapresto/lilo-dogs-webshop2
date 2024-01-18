const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cart: [
    {
      productName: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
