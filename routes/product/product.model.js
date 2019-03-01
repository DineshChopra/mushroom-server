const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    productType: String,
    stock: {type: Number, default: 0}
});

module.exports = mongoose.model('Product', productSchema); // products collection