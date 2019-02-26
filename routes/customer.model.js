const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String
});

module.exports = mongoose.model('Customer', customerSchema); // customers collection