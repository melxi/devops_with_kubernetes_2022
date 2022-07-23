const express = require('express')
const axios = require('axios')
const uuid = require('uuid')
const app = express()
const port = process.env.PORT || 3001
const greeting = process.env.GREETING || 'Tervehdys'

app.get('/', async (req, res) => {
  const randomHash = uuid.v4()
  const timestamp = await axios.get('http://localhost:3000')
                               .then(res => res.data)
                               .catch(err => err)

  const counter = await axios.get('http://pingpong-svc:8089/pingpong')
                             .then(res => res.data)
                             .catch(err => err)

  const result = `${greeting} \n${timestamp}: ${randomHash} \n${counter}`
    
  res.send(result)
})

app.get('/healthz', async (req, res) => {
  try {
    await axios.get('http://pingpong-svc:8089/pingpong')
  } catch (error) {
    res.status(500).json({
      message: 'Failed to connect to pingpong application'
    })
  }

  res.status(200).json({
    message: 'Connected to pingpong application'
  })
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})