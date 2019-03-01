const mongoose = require("mongoose");
const Product = require("./product.model");

exports.createProduct = (req, res, next) => {
    const {name, productType} = req.body;
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name, productType
    });
    product.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
}
exports.editProduct = (req, res, next) => {
    const {name, productType} = req.body;
    const _id = req.body.id; 
    const product = new Product({
        _id, name, productType
        
    });
    Product.updateOne({ _id: req.params.id }, product).then(result => {
        res.status(200).json({ message: "Update successful!" });
    });
}
exports.getAllProducts = (req, res, next) => {
    Product.find().then(
        (documents) => {
            res.status(200).json(documents);
        }
    );
}
exports.getProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
            .then(
                (product) => {
                    res.status(200).json(product);
                }
            )
            .catch(err => {
                res.status(500).json({error: err});
            });
}
exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(
            (result) => {
                res.status(201).send({ message: 'Deleted successfully ------' });
            }
        );
}