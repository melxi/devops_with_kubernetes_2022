const express = require('express')
const output = require('./hashgenerator.js')
const app = express()
const port = process.env.PORT | 3001

app.get('/', (req, res) => {
  res.send(output[output.length - 1])
})

app.listen(port, () => {
  `Server started in port ${port}`
})
