const express = require('express')
const readline = require('readline')
const { Stream } = require('stream')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const app = express()
const port = process.env.PORT || 3001

const dir = path.join('/', 'usr', 'src', 'app', 'logs')

const getLastLine = async (filePath) => {
  filePath = path.join(dir, filePath)
  const readStream = fs.createReadStream(filePath)
  const writeStream = new Stream
  
  return new Promise((resolve, reject)=> {
    let lastLine = ''
    const rl = readline.createInterface(readStream, writeStream)

    rl.on('line', line => {
      if (line.length >= 0) {
        lastLine = line
      }
    })

    rl.on('error', reject)

    rl.on('close', () => {
      resolve(lastLine)
    })
  })
}

app.get('/', async (req, res) => {
  let result = 'Nothing to output!'
  const randomHash = uuid.v4()
  const timestamp = await getLastLine("timestamps.log")
  const counter = await getLastLine("counter.log")

  if (!timestamp) {
    res.send(result)
  } else {
    result = `${timestamp}: ${randomHash} \n` + 
             `Ping / Pongs: ${counter ? counter : 0}`
    
    res.send(result)
  }
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})