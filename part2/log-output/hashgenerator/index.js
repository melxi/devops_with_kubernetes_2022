const express = require('express')
const axios = require('axios')
const uuid = require('uuid')
const app = express()
const port = process.env.PORT || 3001

app.get('/', async (req, res) => {
  const randomHash = uuid.v4()
  const timestamp = await axios.get('http://localhost:3000')
                               .then(res => res.data)
                               .catch(err => err)

  const counter = await axios.get('http://pingpong-svc:8089/pingpong')
                             .then(res => res.data)
                             .catch(err => err)

  const result = `${timestamp}: ${randomHash} \n${counter}`
    
  res.send(result)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})