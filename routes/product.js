const express = require('express');
const router = express.Router()

const productController = require('../controllers/productController')


router.get('/top', productController.topProduct)
router.get('/search/page/:page', productController.searchProducts)
router.get('/page/:page', productController.getAllProducts)

module.exports = router