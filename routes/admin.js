const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminController')
const multer = require('multer');
const adminService = require('../services/adminService');
const upload = multer({ dest: 'temp/' })

router.get('/', (req, res) => res.redirect('/admin/page/1'))
router.get('/search/page/:page', adminController.searchProducts)
router.get('/page/:page', adminController.getAllProducts)
router.get('/product/:id/edit', adminController.getProduct)

router.get('/create/product', adminController.createProduct)
router.get('/create/category', adminController.editCategoryPage)

router.get('/category/:id/edit', adminController.getCategory)
router.get('/category', adminController.getCategories)

router.post('/create/category', adminController.postCategory)
router.post('/create/product', upload.single('image'), adminController.postProduct)

router.put('/product/:id/edit', upload.single('image'), adminController.putProduct)
router.delete('/product/:id', adminController.deleteProduct)
router.delete('/category/:id', adminController.deleteCategory)

module.exports = router

