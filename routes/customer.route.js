const express = require("express");

const Customer = require("./customer.model");

const router = express.Router();

router.post('', (req, res, next) => {
    const customer = new Customer({
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
        res.status(200).json({ message: "Update successful!" });
    });
});

router.get('', (req, res, next) => {
    Customer.find().then(
        (documents) => {
            res.status(200).json(documents);
        }
    );
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