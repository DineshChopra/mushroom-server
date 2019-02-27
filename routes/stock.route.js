const express = require("express");

const Stock = require("./stock.model");
const router = express.Router();

const productRouter = require("./product.route");

router.post('', (req, res, next) => {
    const { productId, price, quantity, totalPrice, purchaseDate } = req.body;
    const stock = new Stock({
        productId, price, quantity, totalPrice, purchaseDate
    });
    stock.save();
    productRouter.updateProductStock(productId, stock.quantity);
    res.status(201).json({
        message: 'Stock added successfully'
    });
});

router.put('/:id', (req, res, next) => {
    const { productId, price, quantity, totalPrice, purchaseDate } = req.body;
    const _id = req.body.id; 
    const stock = new Stock({
        _id, productId, price, quantity, totalPrice, purchaseDate
        
    });
    Stock.updateOne({ _id: req.params.id }, stock).then(result => {
        res.status(200).json({ message: "Update successful!" });
    });
});

router.get('', (req, res, next) => {
    Stock.find()
        .select('_id price productId purchaseDate quantity totalPrice')
        .populate('productId', '_id name')
        .then(
        (documents) => {
            res.status(200).json(documents);
        }
    );
});

router.delete('/:id', (req, res, next) => {
    Stock.deleteOne({ _id: req.params.id })
        .then(
            (result) => {
                console.log('Deleted : ', result);
                res.status(201).send({ message: 'Deleted successfully ------' });
            }
        );
});

module.exports = router;

