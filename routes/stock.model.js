const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockSchema = Schema({
    product: { type: String, ref: 'Product' },
    price: Number,
    quantity: Number,
    totalPrice: Number,
    purchaseDate: Date
});

module.exports = mongoose.model('Stock', stockSchema); // stocks collection