const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/', (req, res) => { return res.redirect('/admin/page/1') })
router.get('/search/page/:page', adminController.searchProducts)
router.get('/page/:page', adminController.getAllProducts)
router.get('/product/:id/edit', adminController.getProduct)

router.put('/product/:id/edit', upload.single('image'), adminController.putProduct)
router.delete('/product/:id', adminController.deleteProduct)

module.exports = router

// upload.single('image'),