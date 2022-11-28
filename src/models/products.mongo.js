const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name must be non-empty'],
    },
    price: {
        type: Number,
        required: [true, 'Product price must be provided'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    rating: {
        type: Number,
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{value} is not allowed to post products',
        },
        // required: [true, 'Company name must be provided'],
    },
});

const products = mongoose.model('Product', productSchema);

module.exports = products;