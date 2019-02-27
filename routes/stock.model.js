const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockSchema = Schema({
    _id: Schema.Types.ObjectId,
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    price: Number,
    quantity: Number,
    totalPrice: Number,
    purchaseDate: Date
});

module.exports = mongoose.model('Stock', stockSchema); // stocks collection