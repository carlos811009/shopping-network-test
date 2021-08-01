const { Product, Category, User, Like } = require('../models')
const { Op, Sequelize } = require('sequelize')

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
        attributes: [
          'id',
          'name',
          'image',
          'price',
          [Sequelize.literal(`(SELECT EXISTS(SELECT * FROM Likes WHERE UserId = ${req.user.id} AND ProductId = Product.id))`), 'isLiked'],
        ],
        limit: limitCount,
        offset: limitCount * page,
        order: [['createdAt', 'DESC']],

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
      const category = await Category.findAll({ raw: true, nest: true })
      const categoryProducts = await Category.findAll({
        raw: true,
        nest: true,
        where: { name: searchKey },
        include: [{ model: Product, attributes: { exclude: ["Products"] } }],
        order: [['createdAt', 'DESC']]
      })
      if (categoryProducts.length !== 0) {
        return callback({ categoryProducts, category })
      }
      if (categoryProducts.length === 0) {
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
        return callback({ products, category })
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = productionService