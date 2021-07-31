module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('登入成功')
      return next()
    }
    req.flash('error_msg', '請先登入才能使用！')
    return res.redirect('/login')
  },
  authAdmin: (req, res, next) => {
    if (req.user.role) {
      next()
    }
  }
}