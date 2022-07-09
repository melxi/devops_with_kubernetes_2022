const express = require('express')
const cors = require('cors')
const { Client } = require('pg')
const morgan = require('morgan')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 3001
const { 
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} = process.env

const client = new Client({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT
}) 

app.use(cors())
app.use(express.json())
app.use(morgan('common'))

client.connect()

client.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title TEXT NOT NULL, completed BOOLEAN)')

app.get('/healthz', async (req, res) => {
  try {
    await client.query('SELECT $1::text as status', ['ACK'])
  } catch(e) {
    res.status(500).json({
      message: 'Failed to connect to database'
    })
  }

  res.status(200).json({
    message: 'Connected to database'
  })
})

app.get('/todos', async (req, res) => {
  const { rows } = await client.query('SELECT * FROM todos')

  res.json(rows)
})

app.post('/todos', async (req, res) => {
  const { title } = req.body

  if (title.length > 140) {
    res.json({ message: 'Todo is too long!' })
  } else if (title.length <= 0) {
    res.json({ message: 'Todo is empty' })
  } else {
    await client.query('INSERT INTO todos (title, completed) VALUES($1, $2);', [title, false])

    res.json({ message: 'Todo added' })
  }
})

app.put('/todos/:id', async (req, res) => {
  const { id, completed } = req.body

  await client.query('UPDATE todos SET completed=$1 WHERE id=$2;', [completed, id])

  res.json({ message: 'Todo updated' })
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})