const page = require('./page')
const user = require('./user')
const admin = require('./admin')
const product = require('./product')
const { authenticator } = require('../middleware/auth')


module.exports = (app) => {
  app.use('/user', user)
  app.use('/admin', admin)
  app.use('/product', authenticator, product)
  app.use('/', page)
}
