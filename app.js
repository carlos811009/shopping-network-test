const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/passport')


if (process.env !== 'production') {
  require('dotenv').config()
}

//set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

//flash message
// app.use(flash)
// app.use(session)
//body-params，extended:true
app.use(express.urlencoded({ extended: true }))
//set css-style-path
app.use(express.static('public'))

// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true
// }))
// // passport-local
// require('./config/passport')(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

require('./routes')(app)
module.exports = app
app.listen(port, () => {
  console.log(`http://localhost:${port} is running`)
})