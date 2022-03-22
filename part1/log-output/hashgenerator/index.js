const express = require('express')
const readline = require('readline')
const { Stream } = require('stream')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const app = express()
const port = process.env.PORT || 3001

const dir = path.join('/', 'usr', 'src', 'app', 'logs')
const filePath = path.join(dir, "timestamps.log")

const getLastTimestamp = async () => {
  const readStream = fs.createReadStream(filePath);
  const writeStream = new Stream
  return new Promise((resolve, reject)=> {
    let lastLine = ''
    const rl = readline.createInterface(readStream, writeStream);

    rl.on('line', function (line) {
      if (line.length >= 0) {
        lastLine = line
      }
    })

    rl.on('error', reject)

    rl.on('close', function () {
      resolve(lastLine)
    })
  })
}

app.get('/', async (req, res) => {
  let result = 'Nothing to output!'
  const randomHash = uuid.v4()
  const timestamp = await getLastTimestamp()

  if (!timestamp) {
    res.send(result)
  } else {
    result = `${timestamp}: ${randomHash}`
    
    res.send(result)
  }
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})