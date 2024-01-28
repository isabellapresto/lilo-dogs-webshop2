const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  //skicka med inloggad user
  // sessionId: { type: String, required: true },
  // id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // username: { type: String, required: true },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
