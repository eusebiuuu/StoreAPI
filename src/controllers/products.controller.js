const { getAllProducts } = require("../models/products.model");

async function httpGetAllProducts(req, res) {
    const response = await getAllProducts(req.query);
    // const error = new Error('Test error');
    // error.status = 404;
    // throw error;
    return res.status(200).json(response);
}

module.exports = {
    httpGetAllProducts,
}