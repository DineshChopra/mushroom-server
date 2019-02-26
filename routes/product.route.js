const express = require("express");

const Product = require("./product.model");

const router = express.Router();

router.post('', (req, res, next) => {
    const {name, productType} = req.body;
    const product = new Product({
        name, productType
    });
    product.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});

router.put('/:id', (req, res, next) => {
    const {name, productType} = req.body;
    const _id = req.body.id; 
    const product = new Product({
        _id, name, productType
        
    });
    Product.updateOne({ _id: req.params.id }, product).then(result => {
        res.status(200).json({ message: "Update successful!" });
    });
});

router.get('', (req, res, next) => {
    Product.find().then(
        (documents) => {
            res.status(200).json(documents);
        }
    );
});

router.delete('/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(
            (result) => {
                console.log('Deleted : ', result);
                res.status(201).send({ message: 'Deleted successfully ------' });
            }
        );
});

router.updateProductStock = (productId, productQuantity) => {
    Product.findById(productId, function (err, doc) {
        if(err) {
            console.log('product update error --- ', err);
        }
        console.log('product --- ', doc);
        doc.stock += productQuantity;
        doc.save();
      });
};

module.exports = router;
