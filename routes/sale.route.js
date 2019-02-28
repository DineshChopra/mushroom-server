const express = require("express");
const mongoose = require("mongoose");

const Sale = require("./sale.model");
const router = express.Router();

const customerRouter = require("./customer.route");
const productRouter = require("./product.route");

router.post('', (req, res, next) => {
    const { product, customer, quantity, salePrice,  totalPrice, amountRecieved, balance,  } = req.body;
    const _id = mongoose.Types.ObjectId();
    const saleDate = new Date();
    const sale = new Sale({
        _id, product, customer, quantity, salePrice,  totalPrice, amountRecieved, balance, saleDate
    });
    sale.save()
        .then(result => {
            updateCustomerBalance(customer, 0, balance);
            updateProductStock(product, 0, quantity);
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(500).json({error});
        })
});

router.put('/:id', (req, res, next) => { 
    const _id = req.params.id;
    Sale.findById(_id)
        .then((result) => {
            const {customer, product, balance, quantity} = req.body;
            updateCustomerBalance(customer, result.balance, balance);
            updateProductStock(product, result.quantity, quantity);
            Sale.updateOne({_id}, req.body)
            .then( function(saleObject) {
                res.status(201).json(saleObject);
            });
        })
});

// router.patch('/:id', (req, res, next) => {
//     const id = req.params.id;
//     const salesObject = req.body;
//     console.log(`request body ------- `, req.body);
//     // for(const ops of req.body) {
//     //     salesObject[ops.propName] = ops.value;
//     // }
//     Sale.update({_id: id}, salesObject)
//         .then(result => {
//             res.status(201).json(result);
//         });
// });

router.get('', (req, res, next) => {
    Sale.find()
        // .limit(1)
        // .select('_id price product purchaseDate quantity totalPrice')
        .populate('product', 'name')
        .populate('customer', 'name')
        .then( (result) => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({error});
        });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Sale.findById(id)
        .populate('product', '_id name')
        .then(
            (sale) => {
                res.status(200).json(sale);
            }
        )
        .catch(err => {
            res.status(500).json({error: err});
        });
});
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Sale.findById(id)
        .then((saleObject) => {
            Sale.deleteOne({ _id: req.params.id })
                .then(() => {
                    const {customer, product, quantity, balance} = saleObject;
                    updateCustomerBalance(customer, balance, 0);
                    updateProductStock(product, quantity, 0);
                    res.status(201).send({ message: 'Deleted successfully ------' });
                });

            });
});

function updateCustomerBalance(customer, previousBalance, balance) {
    const balanceDifference = balance - previousBalance;
    if(balanceDifference !== 0) {
        customerRouter.updateBalance(customer, balanceDifference);
    }
}
function updateProductStock(product, previousStock, stock) {
    const difference = previousStock - stock;
    if(difference !== 0) {
        productRouter.updateProductStock(product, difference);
    }
}

module.exports = router;

