const { Product, Category, User, Like } = require('../models')
const { Op, Sequelize } = require('sequelize')

const limitCount = 12
const productionService = {
  getAllProducts: async (req, res, callback) => {
    try {
      const page = Number(req.params.page)
      const products = await Product.findAndCountAll({
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
        offset: limitCount * (page - 1),
        order: [['createdAt', 'DESC']],

      })
      const pages = Math.ceil(products.count / limitCount)
      const pre = page - 1 > 1 ? page - 1 : 1
      const next = page + 1 < pages ? page + 1 : 4
      const totalPage = Array.from({ length: pages }).map((item, index) => { return index + 1 })
      const category = await Category.findAll({
        raw: true,
        nest: true
      })
      callback({ products, totalPage, page, category, pre, next })
    } catch (err) {
      console.log(err)
    }
  },
  searchProducts: async (req, res, callback) => {
    try {
      const searchKey = req.query.search
      const page = req.params.page
      const category = await Category.findAll({ raw: true, nest: true })
      let products = await Product.findAndCountAll({
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
        order: [['createdAt', 'DESC']],
        limit: limitCount,
        offset: limitCount * (page - 1)
      })
      let pages = Math.ceil(products.count / limitCount)
      let totalPage = Array.from({ length: pages }).map((item, index) => { return index + 1 })
      const pre = page - 1 < 1 ? 1 : page - 1
      let next = page + 1 > pages ? pages : page + 1
      console.log('out:', products)
      if (products.rows.length !== 0) {
        return callback({ products, pre, next, totalPage, page, category, searchKey })
      }
      if (products.rows.length === 0) {
        products = await Product.findAndCountAll({
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
          order: [["createdAt", "DESC"]],
          limit: limitCount,
          offset: limitCount * (page - 1)
        })
        console.log('in: ', products)
        pages = Math.ceil(products.count / limitCount)
        totalPage = Array.from({ length: pages }).map((item, index) => { return index + 1 })
        next = page + 1 > pages ? pages : page + 1
        return callback({ products, pre, next, totalPage, page, category, searchKey })
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = productionService