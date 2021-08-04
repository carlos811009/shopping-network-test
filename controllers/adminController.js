const adminService = require('../services/adminService')

const adminController = {
  getAllProducts: (req, res) => {
    adminService.getAllProducts(req, res, (data) => {
      return res.render('admin', { count: data.count, products: data.rows })
    })
  },
  deleteProduct: (req, res) => {
    adminService.deleteProduct(req, res, (data) => {
      if (data.status === 'success') {
        req.flash('success_msg', data.message)
        return res.redirect('back')
      }
    })
  },
  getProduct: (req, res) => {
    adminService.getProduct(req, res, (data) => {
      return res.render('edit', { product: data.product, category: data.category })
    })
  },
  putProduct: (req, res) => {
    adminService.putProduct(req, res, (data) => {
      if (data.status === 'success') {
        req.flash('success_msg', data.message)
        return res.redirect('back')
      }
    })
  }
}

module.exports = adminController