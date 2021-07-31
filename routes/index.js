const page = require('./page')
const user = require('./user')
const product = require('./product')
const { authenticator } = require('../middleware/auth')


module.exports = (app) => {
  app.use('/user', user)
  app.use('/product', authenticator, product)
  app.use('/', page)
}
