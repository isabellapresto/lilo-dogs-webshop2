const express = require('express');
const { createStripeCheckoutSession, verifySession, getAllOrders, getAllOrdersForUser } = require('../order/order.controller');

const router = express.Router();

router.post ("/create-checkout-session", createStripeCheckoutSession)
router.post('/verify-session', verifySession);
router.get("/all-orders", getAllOrders)
router.get('/all-orders/:username', getAllOrdersForUser);

module.exports = router;
