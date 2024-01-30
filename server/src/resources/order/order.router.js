const express = require('express');
const { createStripeCheckoutSession, verifySession } = require('../order/order.controller');

const router = express.Router();

// router.post('/create-order', createOrder);
router.post ("/create-checkout-session", createStripeCheckoutSession)
router.post('/verify-session', verifySession);

module.exports = router;
