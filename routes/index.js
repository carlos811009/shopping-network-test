const page = require('./page')
const user = require('./user')


module.exports = (app) => {
  app.use('/', page),
  app.use('/user', user),
  app.get('/', (req, res) => {
    res.render('index')
  })
}
