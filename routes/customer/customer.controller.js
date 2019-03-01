const Customer = require('./customer.model');
const mongoose = require('mongoose');
exports.getAllCustomers = (req, res, next) => {
    Customer.find().then(
        (documents) => {
            res.status(200).json(documents);
        }
    );
}
exports.getCustomer = (req, res, next) => {
    const id = req.params.id;
    Customer.findById(id)
            .then(
                (customer) => {
                    res.status(200).json(customer);
                }
            )
            .catch(err => {
                res.status(500).json({error: err});
            });
}

exports.createCustomer = (req, res, next) => {
    const customer = new Customer({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });
    customer.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
}

exports.editCustomer = (req, res, next) => {
    const {name,phone, email} = req.body;
    const _id = req.body.id; 
    const customer = new Customer({
        _id, name, phone, email
        
    });
    Customer.updateOne({ _id: req.params.id }, customer).then(result => {
        res.status(201).json({ message: "Update successful!" });
    });
}

exports.deleteCustomer = (req, res, next) => {
    Customer.deleteOne({ _id: req.params.id })
        .then(
            (result) => {
                res.status(201).send({ message: 'Deleted successfully ------' });
            }
        );
}