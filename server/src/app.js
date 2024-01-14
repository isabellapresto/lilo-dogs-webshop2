const express = require('express');
const cors = require('cors');
const productRouter = require('./resources/product/product.router');
const stripe = require ("./stripe")

const app = express();

app.use(cors()); // Enable CORS

// Other middleware and configurations

app.use('/api', productRouter);
app.use('/api/stripe', stripe);

module.exports = { app };
