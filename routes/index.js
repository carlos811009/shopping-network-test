const page = require('./page')
const user = require('./user')
const { authenticator } = require('../middleware/auth')

module.exports = (app) => {
  app.use('/', page)
  app.use('/user', user)
  app.get('/', authenticator, (req, res) => {
    res.render('index')
  })
}
