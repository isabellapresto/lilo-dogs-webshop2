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
  //skicka med inloggad user
  // sessionId: { type: String, required: true },
  // id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // username: { type: String, required: true },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
