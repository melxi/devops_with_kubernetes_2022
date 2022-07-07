const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 3000

app.set('trust proxy', 1)

// Serve static assets
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Bodyparser middleware
app.use(express.urlencoded({
  limit: '10mb',
  extended: false
}))

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

app.get('/', async (req, res) => {
  const response = await axios.get('http://localhost:3001/todos')
  const todos = response.data

  res.render("index", {
    todos: todos
  })
})

app.post('/', async (req, res) => {
  axios.post('http://localhost:3001/todos', {title: req.body.todo})

  res.redirect('/')
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
      error: err.message
  });

  next(err);
})

app.get('/healthz', async (req, res) => {
  try {
    await axios.get('http://localhost:3001/todos')
  } catch (error) {
    res.status(500).json({
      message: 'Failed to connect to backend application'
    })
  }

  res.status(200).json({
    message: 'Connected to backend application'
  })
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})