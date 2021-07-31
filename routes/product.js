const express = require('express');
const router = express.Router()

const productController = require('../controllers/productController')

router.get('/search', productController.searchProducts)
router.get('/page/:page', productController.getAllProducts)

module.exports = router