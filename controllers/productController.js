const productService = require('../services/productService')


const productController = {
  getAllProducts: (req, res) => {
    productService.getAllProducts(req, res, (data) => {
      return res.render('index', { products: data.products.rows, category: data.category, totalPage: data.totalPage, page: Number(data.page), pre: data.pre, next: data.next })
    })
  },
  searchProducts: (req, res) => {
    productService.searchProducts(req, res, (data) => {
      return res.render('search', { products: data.products.rows, category: data.category, totalPage: data.totalPage, page: Number(data.page), pre: data.pre, next: data.next, searchKey: data.searchKey })
    })
  },
  topProduct: (req, res) => {
    productService.topProduct(req, res, (data) => {
      return res.render('topProduct', { products: data.products, category: data.category,searchKey:data.searchKey })
    })
  }
}

module.exports = productController