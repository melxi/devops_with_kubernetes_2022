const express = require('express')
const { Client } = require('pg')
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

app.use(express.json())

client.connect()

client.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title TEXT NOT NULL, completed BOOLEAN)')

app.get('/todos', async (req, res) => {
  const { rows } = await client.query('SELECT * FROM todos')
  res.json(rows)
})

app.post('/todos', async (req, res) => {
  const { title } = req.body

  await client.query('INSERT INTO todos (title, completed) VALUES($1, $2);', [title, false])
  
  res.json({ message: 'Todo added' })
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})