const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllers')
const passport = require('../config/passport');
const userService = require('../services/userService');

router.get('/like', (req, res) => res.redirect('/user/like/page/1'))
router.get('/like/page/:page', userController.getUserLike)
router.get('/like/search/page/:page', userController.searchLikeProduct)
router.post('/like/:id', userController.likeProducts)
router.delete('/like/:id', userController.deleteLike)

module.exports = router