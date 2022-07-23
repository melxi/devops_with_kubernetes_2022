import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import { connect, StringCodec } from 'nats'
import morgan from 'morgan'

const app = express()
const port = process.env.PORT || 3001
const { Client } = pkg

const { 
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NATS_URL
} = process.env

const client = new Client({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT
})

const sc = StringCodec()
const nc = await connect({
  servers: NATS_URL || 'demo.nats.io:4222'
})

console.log(`NATS: connected to ${nc.getServer()}`);

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

app.post('/broadcast', (req, res) => {
  const { subject, todo } = req.body

  if (subject.includes('created')) {
    res.json({
      user: 'bot',
      message: 'A todo was created',
      todo: todo
    })
  } else if (subject.includes('updated')) {
    res.json({
      user: 'bot',
      message: 'A todo was updated',
      todo: todo
    })
  } else {
    res.json({
      user: 'bot',
      message: 'No updates'
    })
  }
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
    const { rows } = await client.query('INSERT INTO todos (title, completed) VALUES($1, $2);', [title, false])

    nc.publish('todos.created', sc.encode(JSON.stringify(rows[0])))

    res.json({ message: 'Todo added' })
  }
})

app.put('/todos/:id', async (req, res) => {
  const { id, completed } = req.body

  const { rows } = await client.query('UPDATE todos SET completed=$1 WHERE id=$2;', [completed, id])

  nc.publish('todos.updated', sc.encode(JSON.stringify(rows[0])))

  res.json({ message: 'Todo updated' })
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})