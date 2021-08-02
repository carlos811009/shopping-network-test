const adminService = require('../services/adminService')

const adminController = {
  getAllProducts: (req, res) => {
    adminService.getAllProducts(req, res, (data) => {
      return res.render('admin', { count: data.count, products: data.rows })
    })
  }
}

module.exports = adminController