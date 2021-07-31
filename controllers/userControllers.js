const userService = require('../services/userService')

const userController = {
  register: (req, res) => {
    userService.register(req, res, (data) => {
      req.flash(data)
      return res.redirect('/user/login')
    })
  },
  login: (req, res) => {
    res.redirect('/')
  },
}

module.exports = userController