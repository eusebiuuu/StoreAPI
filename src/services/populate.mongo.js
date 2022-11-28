const initProducts = require('./products.json');
const products = require('../models/products.mongo');

async function populateDB() {
    initProducts.forEach(async (product) => {
        await products.findOneAndUpdate({
            rating: product.rating,
            name: product.name,
            company: product.company,
        }, product, {
            upsert: true,
        });
        // console.log(product);
    });
}
module.exports = populateDB;