const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllers')
const passport = require('../config/passport')

router.get('/help', (req, res) => {
  res.render('help')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/logout', userController.logout)
router.get('/', (req, res) => { return res.redirect('/product/page/1') })
router.post('/register', userController.register)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
})
)


module.exports = router