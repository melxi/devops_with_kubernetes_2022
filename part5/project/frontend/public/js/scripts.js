const url = 'http://localhost:8081/todos'
const todoList = document.querySelector('.todos-list')

todoList.addEventListener('click', async function(event) {
  event.stopPropagation()

  if (event.target.id === "todoCheckbox") {
    const todoCheckbox = event.target

    todoCheckbox.disabled = true
    
    await toggleComplete(todoCheckbox)

    todoCheckbox.disabled = false
  }

  return
})

async function toggleComplete(element) {
   const id = element.value
  const isCompleted = element.checked

  const data = {
    id: id,
    completed: isCompleted
  }

  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(data)
  })

  return response.json()
}