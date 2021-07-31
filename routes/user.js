const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllers')
const passport = require('../config/passport')

router.post('/like/:id', userController.likeProducts)

module.exports = router