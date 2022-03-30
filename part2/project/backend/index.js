const express = require('express')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 3001

const todos = [
  {
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "id": 2,
    "title": "quis ut nam facilis",
    "completed": false
  },
  {
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  }
]

app.use(express.json())

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
  const { title } = req.body
  const todo = {
    id: todos.length + 1,
    title: title,
    completed: false
  }
  
  todos.push(todo)
  res.json(todo)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})