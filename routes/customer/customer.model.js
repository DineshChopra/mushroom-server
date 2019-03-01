const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    phone: String,
    email: String,
    balance: {type: Number, default: 0},
    balanceLimit: {type: Number, default: 0}
});

module.exports = mongoose.model('Customer', customerSchema); // customers collection