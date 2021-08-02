const page = require('./page')
const user = require('./user')
const admin = require('./admin')
const product = require('./product')
const { authenticator } = require('../middleware/auth')


module.exports = (app) => {
  app.use('/user', authenticator, user)
  app.use('/admin', authenticator, admin)
  app.use('/product', authenticator, product)
  app.use('/', page)
}
