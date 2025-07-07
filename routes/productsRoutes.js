const express = require('express');
const productController = require('../controllers/productController');
const productsModel = require('../models/productsModel');
const router = express.Router();

module.exports = router;

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router.route('/:id')
    .get(productController.getProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);
    
    router.route('/:products')
    .get(productController.getProduct)    
