const express = require('express');

const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const loginController = require("../app/controllers/LoginController");

router.get('/', siteController.home);
router.get('/home', siteController.home);
router.get('/login', siteController.loginSite);
router.get('/register', siteController.registerSite);
router.get('/profile', loginController.checkLogin, siteController.profile)
router.get('/products', siteController.getProducts)
router.get('/order/:id', siteController.order)

module.exports = router;