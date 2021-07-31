const productService = require('../services/productService')


const productController = {
  getAllProducts: (req, res) => {
    productService.getAllProducts(req, res, (data) => {
      return res.render('index', { products: data.products, category: data.category })
    })
  },
  searchProducts: (req, res) => {
    productService.searchProducts(req, res, (data) => {
      data = data.map(item =>
        item.Products ? item.Products : item
      )
      return res.render('search', { products: data })
    })
  }
}

module.exports = productController