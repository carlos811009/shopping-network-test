const { User, Like, Product, Category } = require('../models')
const { Op, Sequelize } = require('sequelize')
const limitCount = 12
const userService = {
  register: async (req, res, callback) => {
    try {
      const { name, account, password, checkPassword } = req.body
      const user = await Users.findOne({
        where: { account: account }
      })
      if (user) {
        return callback({ status: "error", message: "此帳號已被註冊" })
      }
      if (!name.trim() || !account.trim() || !password.trim() || !checkPassword.trim()) {
        return callback({ status: "error", message: "所有欄位都需要填寫" })
      }
      if (password.trim() !== checkPassword.trim()) {
        return callback({ status: "error", message: "請確認密碼一致" })
      }
      const create = await Users.create({
        name,
        account,
        password
      })
      if (create) {
        return callback({ status: "seccess", message: "註冊成功，請登入使用" })
      }
    } catch (err) {
      console.log(err)
    }

  },
  likeProducts: async (req, res, callback) => {
    try {
      const like = await Like.create({
        UserId: req.user.id,
        ProductId: Number(req.params.id)
      })
      if (like) { return callback({ status: 'success', message: '新增成功' }) }
      callback({ status: 'error', message: '新增失敗' })
    } catch (err) {
      console.log(err)
    }
  },
  deleteLike: async (req, res, callback) => {
    try {
      const removeLike = await Like.destroy({
        where: {
          UserId: req.user.id,
          ProductId: Number(req.params.id)
        }
      })
      return callback({ status: 'success', message: '移除成功' })
    } catch (err) {
      console.log(err)
    }
  },
  getUserLike: async (req, res, callback) => {
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
          [Sequelize.literal(`(SELECT EXISTS(SELECT * FROM Likes WHERE UserId = ${req.user.id} AND ProductId = Product.id))`), 'isLiked'],
        ],
        include: [{ model: User, as: 'Users', where: { id: req.user.id } }],
        limit: limitCount,
        offset: limitCount * (page - 1)
      })
      const pages = Math.ceil(products.count / limitCount)
      const totalPage = Array.from({ length: pages }).map((item, index) => { return index + 1 })
      const pre = page - 1 < 1 ? 1 : page - 1
      const next = page + 1 > pages ? pages : page + 1
      const category = await Category.findAll({
        raw: true,
        nest: true
      })
      return callback({ products, pre, next, totalPage, page, category })
    } catch (err) {
      console.log(err)
    }
  },
  searchLikeProduct: async (req, res, callback) => {
    try {
      const searchKey = req.query.search
      const page = Number(req.params.page)
      const products = await Product.findAndCountAll({
        raw: true,
        nest: true,
        attributes: [
          'id',
          'name',
          'image',
          'price',
          [Sequelize.literal(`(SELECT EXISTS(SELECT * FROM Likes WHERE UserId = ${req.user.id} AND ProductId = Product.id))`), 'isLiked'],
        ],
        include: [
          { model: User, as: 'Users', where: { id: req.user.id } },
          { model: Category, where: { name: searchKey } }
        ],
        limit: limitCount,
        offset: limitCount * (page - 1)
      })
      const pages = Math.ceil(products.count / limitCount)
      const totalPage = Array.from({ length: pages }).map((item, index) => { return index + 1 })
      const pre = page - 1 < 1 ? 1 : page - 1
      const next = page + 1 > pages ? pages : page + 1
      const category = await Category.findAll({
        raw: true,
        nest: true
      })
      return callback({ products, pre, next, totalPage, page, category, searchKey })
    } catch (err) {
      console.log(err)
    }
  }

}

module.exports = userService