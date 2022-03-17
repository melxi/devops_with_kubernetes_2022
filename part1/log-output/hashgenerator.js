const uuid = require('uuid')
const memory = []

const generateHash = () => {
  const randomHash = uuid.v4()
  const date = new Date().toISOString()

  const output = `${date}: ${randomHash}`
  console.log(output)

  memory.push(output)
  setTimeout(generateHash, 5000)
}

generateHash()

module.exports = memory
