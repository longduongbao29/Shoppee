const express = require('express');
const router = express.Router();

const userAPI = require('../app/controllers/UserAPI')
const productAPI = require('../app/controllers/ProductAPI');

//Users API
router.get('/api/v1/getusers', userAPI.getUsers);
router.get('/api/v1/finduser/:id', userAPI.findUser);


//Products API
router.get('/api/v1/getproducts', productAPI.getAllProducts);
router.get('/api/v1/findproduct/:id', productAPI.findProduct);
router.get('/api/v1/products/:from/:to', productAPI.getProductList);

module.exports = router;