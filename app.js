const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')


// if (process.env !== 'production'){
//   require('dotenv').config()
// }

//set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
//body-params，extended:true
app.use(express.urlencoded({ extended: true }))
//set css-style-path
app.use(express.static('public'))

//
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

//flash message
app.use(flash)
app.use(session)

require('./routes')(app)

app.listen(port, () => {
  console.log(`http://localhost:${port} is running`)
})