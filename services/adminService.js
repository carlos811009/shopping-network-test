const { Product, Category, User, Like } = require('../models')
const { Op, Sequelize } = require('sequelize')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

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
        // console.log(img)
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
      console.log(product)
      return callback({ status: 'success', message: '產品修改成功' })

    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = adminService