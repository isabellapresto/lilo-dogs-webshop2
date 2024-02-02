const express = require('express');
const productController = require('./product.controller');

const router = express.Router();

router
  .get('/products/:id', productController.getProductById)
  .get('/products', productController.getAllProducts)
  .get('/products/category/:category', productController.getProductsByCategory);

module.exports = router;
