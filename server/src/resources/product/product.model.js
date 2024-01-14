const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  productId: { type: Number, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // Uppdaterat fältet till 'category'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
