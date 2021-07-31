const express = require('express');
const router = express.Router()

router.get('/help', (req, res) => {
  res.render('help')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.get('/login', (req, res) => {
  res.render('login')
})


module.exports = router