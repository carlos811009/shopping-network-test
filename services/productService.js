const { Product, Category } = require('../models')
const { Op } = require('sequelize')

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
        offset: limitCount * page,
        order: [['createdAt', 'DESC']]
      })
      const category = await Category.findAll({
        raw: true,
        nest: true
      })
      callback({ products, totalPages, page, category })
    } catch (err) {
      console.log(err)
    }
  },
  searchProducts: async (req, res, callback) => {
    try {
      const searchKey = req.query.search
      const category = await Category.findAll({
        raw: true,
        nest: true,
        where: { name: searchKey },
        include: [{ model: Product, attributes: { exclude: ["Products"] } }],
        order: [['createdAt', 'DESC']]
      })
      if (category.length !== 0) {
        return callback(category)
      }
      if (category.length === 0) {
        const products = await Product.findAll({
          raw: true,
          nest: true,
          where: {
            name:
            {
              [Op.substring]: searchKey,
            }
          },
          order: [["createdAt", "DESC"]]
        })
        console.log('products', products)
        return callback(products)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = productionService