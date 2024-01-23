const express = require('express');
const cors = require('cors');
const productRouter = require('./resources/product/product.router');
const userRouter = require('./resources/user/user.router');
const orderRouter = require('./resources/order/order.router');
const cookieSession = require('cookie-session');
const { authenticateUser } = require('./resources/user/auth.middleware');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors()); // Enable CORS

app.use(express.json());

app.use(
 cookieSession({
   name: 'session',
   keys: ['ea1e54fba531dff2e1f00bb18fafdf5a234e6c1d418748f9b08b946ed17fb7a2'], // Sätt ett säkert hemligt nyckel här
   maxAge: 24 * 60 * 60 * 1000, // 24 timmars giltighetstid för sessionen (kan justeras efter behov)
 })
);

app.use(authenticateUser);
app.use('/api', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

module.exports = { app };
