const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/', adminController.getAllProducts)

router.post('/', (req, res) => {
  console.log('body', req.body)
  console.log('params', req.params)
})

router.delete('/product/:id', adminController.deleteProduct)


module.exports = router