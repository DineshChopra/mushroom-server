const express = require("express");
const router = express.Router();

const StockController = require('./stock.controller');

router.post('', StockController.createStock);
router.put('/:id', StockController.editStock);
router.get('', StockController.getAllStocks);
router.get('/:id', StockController.getStock);
router.delete('/:id', StockController.deleteStock);

module.exports = router;

