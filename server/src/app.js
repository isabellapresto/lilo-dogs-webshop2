const express = require('express');
const cors = require('cors');
const productRouter = require('./resources/product/product.router');
const userRouter = require('./resources/user/user.router');  
const orderRouter = require('./resources/order/order.router'); 
require("dotenv").config();
const cookieSession = require('cookie-session');

const app = express();

app.use(cors()); // Enable CORS

app.use(express.json());

app.use(
 cookieSession({
   name: 'session',
   secret: ['ea1e54fba531dff2e1f00bb18fafdf5a234e6c1d418748f9b08b946ed17fb7a2'],
   veUninitialized: true, 
   maxAge: 24 * 60 * 60 * 1000, 
 })
);



app.use('/api', productRouter);
app.use('/api/users', userRouter);

app.use('/api/orders', orderRouter);






module.exports = { app };
