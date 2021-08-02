const { Product, Category, User, Like } = require('../models')
const { Op, Sequelize } = require('sequelize')

const adminService = {
  getAllProducts: async (req, res, callback) => {
    try {
      const products = await Product.findAndCountAll({ raw: true, nest: true, include: [Category] })
      return callback(products)
    } catch (err) {
      console.log(err)
    }
  },
  deleteProduct: async (req, res, callback) => {
    try {
      const deleteProduct = await Product.findByPk((req.params.id))
      await deleteProduct.destroy()
      return callback({ status: "success", message: "產品刪除成功" })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = adminService