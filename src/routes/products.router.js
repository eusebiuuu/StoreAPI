const express = require('express');
const { httpGetAllProducts } = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', httpGetAllProducts);

module.exports = productsRouter;