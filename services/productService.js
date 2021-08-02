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
          'description',
          [Sequelize.literal(`(SELECT EXISTS(SELECT * FROM Likes WHERE UserId = ${req.user.id} AND ProductId = Product.id))`), 'isLiked'],
        ],
        include: [Category],
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
      let products = await Product.findAll({
        raw: true,
        nest: true,
        attributes: [
          'id',
          'name',
          'image',
          'price',
          'description',
          [Sequelize.literal(`(SELECT EXISTS(SELECT * FROM Likes WHERE UserId = ${req.user.id} AND ProductId = Product.id))`), 'isLiked'],],
        include: [{ model: Category, where: { name: { [Op.substring]: searchKey } } }],
        order: [['createdAt', 'DESC']]
      })
      if (products.length !== 0) {
        return callback({ products, category })
      }
      if (products.length === 0) {
        products = await Product.findAll({
          raw: true,
          nest: true,
          where: {
            name:
            {
              [Op.substring]: searchKey,
            }
          },
          attributes: [
            'id',
            'name',
            'image',
            'price',
            [Sequelize.literal(`(SELECT EXISTS(SELECT * FROM Likes WHERE UserId = ${req.user.id} AND ProductId = Product.id))`), 'isLiked'],],
          include: [Category],
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