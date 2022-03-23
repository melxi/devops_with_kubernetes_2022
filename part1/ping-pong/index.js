const express = require('express')
const readline = require('readline')
const fs = require('fs')
const path = require('path')
const app = express()
const port = process.env.PORT || 3002

const dir = path.join('/', 'usr', 'src', 'app', 'logs')
const filePath = path.join(dir, "counter.log")

const counterFileExists = async () => {
  fs.stat(filePath, (err, stats) => new Promise(res => {
    if (err || !stats) return res(false)
      return res(true)
  }))
}

const increaseCounter = async () => {
  if (await counterFileExists()) return

  const readStream = fs.createReadStream(filePath)
  const writeStream = fs.createWriteStream(filePath, {flags: 'a'})
  let counter
  
  return new Promise((resolve, reject)=> {
    const rl = readline.createInterface(readStream, writeStream)

    rl.on('line', line => {
      if (line.length > 0) {
        counter = line
        counter++
      }
    })

    rl.on('error', reject)

    rl.on('close', () => {
      if (!counter)
        counter = 0
                      
      writeStream.write(counter + "\r\n")
      writeStream.end()
      resolve(counter)
    })
  })
}

app.get("/pingpong", async (req, res) => {
  const counter = await increaseCounter()

  res.send(`pong ${counter}`)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})