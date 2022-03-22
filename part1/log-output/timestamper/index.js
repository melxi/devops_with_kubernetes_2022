const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

const dir = path.join('/', 'usr', 'src', 'app', 'logs')
const filePath = path.join(dir, "timestamps.log")

const timestampFileExists = async () => {
  fs.stat(filePath, (err, stats) => new Promise(res => {
    if (err || !stats) return res(false)
      return res(true)
  }))
}

const createTimestamp = async () => {
  if (await timestampFileExists()) return

  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) throw err;
  })

  const logStream = fs.createWriteStream(filePath, {flags: 'a'})
  const date = new Date().toISOString()

  logStream.write(date + "\r\n")
  logStream.end()
}

setInterval(createTimestamp, 5000)

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})