const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
  res.render('admin')
})
router.post('/', (req, res) => {
  console.log('body', req.body)
  console.log('params', req.params)
})


module.exports = router