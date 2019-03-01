const mongoose = require("mongoose");
const Stock = require("./stock.model");
const productRouter = require("../product/product.route");

exports.createStock = (req, res, next) => {
    const { productId, price, quantity, totalPrice, purchaseDate } = req.body;
    const _id = mongoose.Types.ObjectId();
    const stock = new Stock({
        _id, product: productId, price, quantity, totalPrice, purchaseDate
    });
    stock.save();
    productRouter.updateProductStock(productId, stock.quantity);
    res.status(201).json({
        message: 'Stock added successfully'
    });
}

exports.editStock = (req, res, next) => {
    const { productId, price, quantity, totalPrice, purchaseDate } = req.body;
    const _id = req.body.id; 
    const stock = new Stock({
        _id, price, quantity, totalPrice, purchaseDate, product: productId
        
    });
    Stock.findById(_id, function (err, doc) {
        if(err) {
            console.log('product update error --- ', err);
        }
        
        Stock.updateOne({ _id: req.params.id }, stock).then(result => {
            res.status(200).json({ message: "Update successful!" });
        });
        const previousQuantity = doc.quantity;
        const quantityDifference = quantity - previousQuantity;
        if(quantityDifference !== 0) {
            productRouter.updateProductStock(productId, quantityDifference);
        }
      });
}
exports.getAllStocks = (req, res, next) => {
    Stock.find()
        // .select('_id price product purchaseDate quantity totalPrice')
        .populate('product')
        .then(
        (documents) => {
            res.status(200).json(documents);
        }
    );
}
exports.getStock = (req, res, next) => {
    const id = req.params.id;
    Stock.findById(id)
            .populate('product', '_id name')
            .then(
                (stock) => {
                    res.status(200).json(stock);
                }
            )
            .catch(err => {
                res.status(500).json({error: err});
            });
}
exports.deleteStock = (req, res, next) => {
    const id = req.params.id;
    Stock.findById(id)
        .populate('product', '_id ')
        .then(
            (stock) => {
                Stock.deleteOne({ _id: req.params.id })
                    .then(
                        () => {
                            res.status(201).send({ message: 'Deleted successfully ------' });
                            const quantity = - stock.quantity;
                            const productId = stock.product._id;
                            productRouter.updateProductStock(productId, quantity);
                            
                        }
                    );

            });
}