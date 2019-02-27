const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saleSchema = Schema({
    _id: Schema.Types.ObjectId,
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    quantity: Number,
    salePrice: Number,
    totalPrice: Number,
    amountRecieved: Number,
    balance: Number,
    saleDate: Date
});

module.exports = mongoose.model('Sale', saleSchema); // sales collection