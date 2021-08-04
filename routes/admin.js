const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/', adminController.getAllProducts)
router.get('/product/:id/edit', adminController.getProduct)

router.put('/product/:id/edit', upload.single('image'), adminController.putProduct)

// router.post('/', (req, res) => {
//   console.log('body', req.body)
//   console.log('params', req.params)
// })

router.delete('/product/:id', adminController.deleteProduct)

module.exports = router

// upload.single('image'),