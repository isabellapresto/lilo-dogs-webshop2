const express = require('express');
const cors = require('cors');
const productRouter = require('./resources/product/product.router');
const userRouter = require('./resources/user/user.router');
const orderRouter = require('./resources/order/order.router');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors()); 

app.use(express.json());

app.use(
  session({
    name: 'session',
    secret: ['ea1e54fba531dff2e1f00bb18fafdf5a234e6c1d418748f9b08b946ed17fb7a2'], 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

app.use('/api', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

module.exports = { app };
