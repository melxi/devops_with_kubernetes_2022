const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = process.env.PORT | 3000

// Serve static assets
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render("index")
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
