const express = require("express");
const Customer = require("./customer.model");
const checkAuth = require("../../middleware/check-auth");

const router = express.Router();
const CustomerController = require('./customer.controller');

// router.post('', checkAuth, CustomerController.createCustomer);
router.post('', CustomerController.createCustomer);
router.put('/:id', CustomerController.editCustomer);
router.get('', CustomerController.getAllCustomers);
router.get('/:id', CustomerController.getCustomer);
router.delete('/:id', CustomerController.deleteCustomer);

router.updateBalance = (customerId, balance) => {
    Customer.findById(customerId)
            .then(customer => {
                customer.balance += balance;
                customer.save();
            });
}

module.exports = router;