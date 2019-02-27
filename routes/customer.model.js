const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    phone: String,
    email: String
});

module.exports = mongoose.model('Customer', customerSchema); // customers collection