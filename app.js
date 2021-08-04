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
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers: require('./config/handlebars-helpers') }))
app.set('view engine', 'hbs')

//body-body，extended:true
app.use(express.urlencoded({ extended: true }))
//set css-style-path
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))



//flash message
app.use(flash())

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

require('./routes')(app)
module.exports = app
app.listen(port, () => {
  console.log(`http://localhost:${port} is running`)
})