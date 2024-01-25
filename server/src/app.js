const express = require('express');
const cors = require('cors');
const productRouter = require('./resources/product/product.router');
const userRouter = require('./resources/user/user.router');
const orderRouter = require('./resources/order/order.router');
const session = require('express-session');
const { authenticateUser } = require('./resources/user/auth.middleware');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors()); // Enable CORS

app.use(express.json());

app.use(
  session({
    name: 'session',
    secret: 'your-secret-key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

app.use(authenticateUser);
app.use('/api', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

module.exports = { app };
