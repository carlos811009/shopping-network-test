const { Product, Category, User, Like } = require('../models')
const { Op, Sequelize } = require('sequelize')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const limitCount = 30

const imgurUpload = (filePath) => {
  return new Promise((resolve, reject) => {
    imgur.upload(filePath, (err, img) => {
      if (err) return reject(err)
      return resolve(img)
    })
  })
}

const adminService = {
  getAllProducts: async (req, res, callback) => {
    try {
      const page = Number(req.params.page) || 1
      const products = await Product.findAndCountAll({ raw: true, nest: true, include: [Category], limit: limitCount, offset: limitCount * (page - 1) })
      const pages = Math.ceil(products.count / limitCount)
      const totalPage = Array.from({ length: pages }).map((item, index) => { return index + 1 })
      const pre = page - 1 < 1 ? 1 : page - 1
      const next = page + 1 > pages ? pages : page + 1
      return callback({ products, pre, next, totalPage, page })
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
  },
  getProduct: async (req, res, callback) => {
    try {
      const product = await Product.findByPk((req.params.id), { raw: true, nest: true, include: [Category] })
      const category = await Category.findAll({ raw: true, nest: true })
      return callback({ product, category })
    } catch (err) {
      console.log(err)
    }
  },
  putProduct: async (req, res, callback) => {
    try {
      const { name, category, price, description } = req.body
      //if want to put data, cannot use raw:true, nest:true
      const product = await Product.findByPk((req.params.id))
      const { file } = req
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        const img = await imgurUpload(file.path)
        await product.update({
          name,
          CategoryId: category,
          price,
          description,
          image: img.data.link || req.user.image
        })
      } else {
        await product.update({
          name,
          CategoryId: category,
          price,
          description,
          file: req.user.image || ''
        })
      }
      return callback({ status: 'success', message: '產品修改成功' })

    } catch (err) {
      console.log(err)
    }
  },
  searchProducts: async (req, res, callback) => {
    try {
      const searchKey = req.query.search
      const page = Number(req.params.page) || 1
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
      const pages = Math.ceil(products.count / limitCount)
      const totalPage = Array.from({ length: pages }).map((item, index) => { return index + 1 })
      const pre = page - 1 < 1 ? 1 : page - 1
      const next = page + 1 > pages ? pages : page + 1
      return callback({ products, pre, next, totalPage, page, searchKey })
    } catch (err) {
      console.log(err)
    }
  },
  editCategoryPage: async (req, res, callback) => {
    const isCategory = true
    return callback(isCategory)
  },
  postCategory: async (req, res, callback) => {
    try {
      const { name } = req.body
      await Category.create({
        name,
      })
      callback({ status: 'success', message: `新類別『${name}』創建成功` })
    } catch (err) {
      console.log(err)
    }
  },
  getCategories: async (req, res, callback) => {
    try {
      const categories = await Category.findAll({ raw: true, nest: true })
      const isCategory = true
      return callback({ categories, isCategory })
    } catch (err) {
      console.log(err)
    }
  },
  getCategory: async (req, res, callback) => {
    try {
      const category = await Category.findByPk(req.params.id, { raw: true, nest: true })
      const isCategory = true
      return callback({ category, isCategory })
    } catch (err) {
      console.log(err)
    }
  },
  deleteCategory: async (req, res, callback) => {
    try {
      const category = await Category.findByPk(req.params.id)
      await category.destroy()
      return callback({ status: 'success', message: '刪除成功' })
    } catch (err) {
      console.log(err)
    }
  },

}

module.exports = adminService