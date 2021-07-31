const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllers')

router.get('/logout')
router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router