const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  const date = new Date().toISOString()

  res.send(date)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})