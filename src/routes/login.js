const express = require('express');

const router = express.Router();

const loginController = require("../app/controllers/LoginController");

router.post('/login', loginController.login);
router.post('/register', loginController.register);
router.get('/logout', loginController.logout);

module.exports = router;