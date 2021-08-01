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
    req.flash('success_msg', '登出成功')
    return res.redirect('/login')
  },
  likeProducts: (req, res) => {
    userService.likeProducts(req, res, (data) => {
      if (data.status === 'success') {
        req.flash('success_msg', data.message)
        return res.redirect('back')
      }
      if (data.status === 'error') {
        req.flash('error_msg', data.message)
        return res.redirect('back')
      }
    })
  },
  deleteLike: (req, res) => {
    userService.deleteLike(req, res, (data) => {
      if (data.status === 'success') {
        req.flash('success_msg', data.message)
        return res.redirect('back')
      }
    })
  },
  getUserLike: (req, res) => {
    userService.getUserLike(req, res, (data) => {
      return res.render('like', { products: data.products, category: data.category })
    })
  },
  searchLikeProduct: (req, res) => {
    userService.searchLikeProduct(req, res, (data) => {
      return res.render('like', { products: data.products, category: data.category })
    })
  }

}

module.exports = userController