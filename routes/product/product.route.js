const express = require("express");
const Product = require("./product.model");
const ProductController = require('./product.controller');

const router = express.Router();

router.post('', ProductController.createProduct);
router.put('/:id', ProductController.editProduct);
router.get('', ProductController.getAllProducts);
router.get('/:id', ProductController.getProduct);
router.delete('/:id', ProductController.deleteProduct);

router.updateProductStock = (productId, productQuantity) => {
    Product.findById(productId)
            .then(product => {
                product.stock += productQuantity;
                product.save();
            });
};

module.exports = router;
