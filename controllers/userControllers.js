const userService = require('../services/userService')

const userController = {
  register: (req, res) => {
    userService.register(req, res, (data) => {
      req.flash(data)
      return res.redirect('/login')
    })
  },
  login: (req, res) => {
    res.redirect('/')
  },
  logout: (req, res) => {
    req.logout()
    return res.redirect('/login')
  }
}

module.exports = userController