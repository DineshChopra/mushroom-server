const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    productId: String,
    price: Number,
    quantity: Number,
    totalPrice: Number,
    purchaseDate: Date
});

module.exports = mongoose.model('Stock', stockSchema); // stocks collection