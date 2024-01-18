const express = require('express');
const cors = require('cors');
const productRouter = require('./resources/product/product.router');
const userRouter = require('./resources/user/user.router');  
const orderRouter = require('./resources/order/order.router'); 
require("dotenv").config();

const app = express();

app.use(cors()); // Enable CORS

app.use(express.json());


app.use('/api', productRouter);
app.use('/api/users', userRouter);

app.use('/api/orders', orderRouter);


// app.use('/api/stripe', stripe);

module.exports = { app };
