const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllers')
const passport = require('../config/passport');
const userService = require('../services/userService');


router.get('/like', userController.getUserLike)
router.get('/like/search', userController.searchLikeProduct)
router.post('/like/:id', userController.likeProducts)
router.delete('/like/:id', userController.deleteLike)

module.exports = router