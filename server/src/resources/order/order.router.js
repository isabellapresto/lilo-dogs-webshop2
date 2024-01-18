const express = require('express');
const { createOrder, createStripeCheckoutSession } = require('../order/order.controller');

const router = express.Router();

router.post('/create-order', createOrder);
router.post ("/create-checkout-session", createStripeCheckoutSession)

module.exports = router;
