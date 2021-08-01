const { User, Like, Product, Category } = require('../models')
const { Op, Sequelize } = require('sequelize')

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
        include: [{ model: User, as: 'Users', where: { id: req.user.id } }]
      })
      const category = await Category.findAll({
        raw: true,
        nest: true
      })
      return callback({ products, category })
    } catch (err) {
      console.log(err)
    }
  },
  searchLikeProduct: async (req, res, callback) => {
    try {
      console.log(req.query.search)
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
        include: [
          { model: User, as: 'Users', where: { id: req.user.id } },
          { model: Category, where: { name: req.query.search } }
        ]
      })
      const category = await Category.findAll({
        raw: true,
        nest: true
      })
      return callback({ products, category })
    } catch (err) {
      console.log(err)
    }
  }

}

module.exports = userService