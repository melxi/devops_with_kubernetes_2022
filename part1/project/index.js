const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 3000

const todos = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  }
]

app.set('trust proxy', 1)

// Serve static assets
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const dir = path.join(__dirname, 'public', 'img')
const filePath = path.join(dir, "image.jpg")

let cacheTime

const downloadRandomImage = async (req, res, next) => {
  if (cacheTime && cacheTime > Date.now() - 24 * 60 * 60 * 1000) {
    return
  }
  
  try {
    const url = 'https://picsum.photos/1200'

    const response = await axios(
      {
        url,
        method: 'GET',
        responseType: 'stream'
      }
    )

    cacheTime = Date.now()

    return new Promise((resolve, reject) => {
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) throw err;
      })

      response.data.pipe(fs.createWriteStream(filePath))
        .on('error', reject)
        .once('close', () => resolve(filePath))
    })
  } catch (err) {
    next()
  }
}

app.use(async (req, res, next) => {
  await downloadRandomImage(req, res, next)

  next()
})

app.get('/', (req, res) => {
  res.render("index", {
    todos: todos
  })
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})