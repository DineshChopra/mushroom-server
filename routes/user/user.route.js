const express = require("express");

const router = express.Router();

const UserController = require('./user.controller');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.delete('/:userId', UserController.deleteUser);

module.exports = router;