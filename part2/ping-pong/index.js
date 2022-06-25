const express = require('express')
const { Pool, Client } = require('pg')
const app = express()
const port = process.env.PORT || 3002
const { 
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} = process.env

console.log(POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD);

const client = new Client({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT
})

client.connect()

client.query('CREATE TABLE IF NOT EXISTS pingpong (id VARCHAR(12), count INTEGER DEFAULT 0)')

client.query('SELECT EXISTS(SELECT count FROM pingpong)', (err, res) => {
  if (!res.rows[0].exists) {
    client.query('INSERT INTO pingpong (id, count) VALUES($1, $2);', ['pingpongs', 0], (err, res) => {
      console.log(err, res)
    })
  }
})

app.get("/pingpong", async (req, res) => {
  let counter;
  const { rows } = await client.query('SELECT count FROM pingpong WHERE id=$1', ['pingpongs'])

  counter = rows[0].count;

  res.send(`Ping / Pongs: ${counter}`);

  client.query('UPDATE pingpong SET count = count + 1')
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})