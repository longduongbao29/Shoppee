const express = require('express');

const router = express.Router();

const pageController = require("../app/controllers/SiteController");

router.get('/home', pageController.home);
router.get('/login', pageController.login);
module.exports = router;