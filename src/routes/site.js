const express = require('express');

const router = express.Router();

const pageController = require("../app/controllers/SiteController");

router.get('/', pageController.home);
router.get('/home', pageController.home);
router.get('/login', pageController.loginSite);
router.get('/register', pageController.registerSite);

module.exports = router;