const express = require("express");

const Stock = require("./stock.model");
const router = express.Router();

const productRouter = require("./product.route");

router.post('', (req, res, next) => {
    const { productId, price, quantity, totalPrice, purchaseDate } = req.body;
    console.log('productId : ', productId);
    const stock = new Stock({
        product: productId, price, quantity, totalPrice, purchaseDate
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
        console.log(`------ quantity : ${quantity},  previousQuantity : ${previousQuantity}, quantityDifference: ${quantityDifference}`);
        if(quantityDifference !== 0) {
            productRouter.updateProductStock(productId, quantityDifference);
        }
      });
});

router.get('', (req, res, next) => {
    Stock.find()
        // .select('_id price product purchaseDate quantity totalPrice')
        .populate('product')
        .then(
        (documents) => {
            console.log('Stocks ', documents);
            res.status(200).json(documents);
        }
    );
});

router.delete('/:id', (req, res, next) => {
    const _id = req.params.id;
    Stock.findOne({_id: req.params.id})
        .populate('product', '_id ')
        .then(
            (stock) => {
                console.log('---===== Deleted  stock: ', stock);
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
});

module.exports = router;

