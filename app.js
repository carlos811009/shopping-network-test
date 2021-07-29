const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()

//set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
//body-params
app.use(express.urlencoded({ extended: true }))
//set css-style-path
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('help')
})


app.listen(port, () => {
  console.log(`http://localhost:${port} is running`)
})