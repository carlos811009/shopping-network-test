const { Product } = require('../models')
const limitCount = 12
const productionService = {
  getAllProducts: async (req, res, callback) => {
    try {
      const count = await Product.findAndCountAll()
      const page = req.params.page
      const totalPages = Math.ceil(count.count / limitCount)
      const products = await Product.findAll({
        raw: true,
        nest: true,
        limit: limitCount,
        offset: limitCount * page
      })
      callback({ products, totalPages, page })
    } catch (err) {
      console.log(err)
    }
  },
  searchProducts: async (req, res, callback) => {
    try {
      console.log(req.query)
      // callback({ req.query })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = productionService