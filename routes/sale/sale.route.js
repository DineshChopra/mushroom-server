const express = require("express");
const router = express.Router();
const SaleController = require('./sale.controller');

router.post('', SaleController.createSale);
router.put('/:id', SaleController.editSale);
router.get('', SaleController.getAllSales);
router.get('/:id', SaleController.getSale);
router.delete('/:id', SaleController.deleteSale);

// router.patch('/:id', (req, res, next) => {
//     const id = req.params.id;
//     const salesObject = req.body;
//     // for(const ops of req.body) {
//     //     salesObject[ops.propName] = ops.value;
//     // }
//     Sale.update({_id: id}, salesObject)
//         .then(result => {
//             res.status(201).json(result);
//         });
// });
module.exports = router;
