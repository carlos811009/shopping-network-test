const productService = require('../services/productService')


const productController = {
  getAllProducts: (req, res) => {
    productService.getAllProducts(req, res, (data) => {
      return res.render('index', { products: data.products })
    })
  },
  searchProducts: (req, res) => {
    productService.searchProducts(req, res, (data) => {
      // return console.log(data)
    })
  }
}

module.exports = productController