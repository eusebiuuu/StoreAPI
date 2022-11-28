require('express-async-errors');
const express = require('express');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const productsRouter = require('./routes/products.router');

const app = express();

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use('/api/products', productsRouter);
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/products">Go to products</a>');
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;