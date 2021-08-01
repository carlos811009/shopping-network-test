const productService = require('../services/productService')


const productController = {
  getAllProducts: (req, res) => {
    productService.getAllProducts(req, res, (data) => {
      console.log(data.products[0])
      return res.render('index', { products: data.products, category: data.category })
    })
  },
  searchProducts: (req, res) => {
    productService.searchProducts(req, res, (data) => {
      if (data.categoryProducts) {
        const products = data.categoryProducts.map(item =>
          item.Products ? item.Products : item
        )
        return res.render('search', { products, category: data.category })
      } else {
        return res.render('search', { products: data.products, category: data.category })
      }
    })
  }
}

module.exports = productController