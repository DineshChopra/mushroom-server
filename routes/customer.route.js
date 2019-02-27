const express = require("express");
const mongoose = require('mongoose');
const Customer = require("./customer.model");

const router = express.Router();

router.post('', (req, res, next) => {
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
});

router.put('/:id', (req, res, next) => {
    const {name,phone, email} = req.body;
    const _id = req.body.id; 
    const customer = new Customer({
        _id, name, phone, email
        
    });
    Customer.updateOne({ _id: req.params.id }, customer).then(result => {
        res.status(201).json({ message: "Update successful!" });
    });
});

router.get('', (req, res, next) => {
    Customer.find().then(
        (documents) => {
            res.status(200).json(documents);
        }
    );
});

router.get('/:id', (req, res, next) => {
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
});
router.delete('/:id', (req, res, next) => {
    console.log('id ---- ', req.params.id);
    Customer.deleteOne({ _id: req.params.id })
        .then(
            (result) => {
                console.log('Deleted : ', result);
                res.status(201).send({ message: 'Deleted successfully ------' });
            }
        );
});

module.exports = router;