const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    productType: String,
    stock: {type: Number, default: 0}
});

module.exports = mongoose.model('Product', productSchema); // products collection