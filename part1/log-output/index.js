const uuid = require('uuid')

const generateHash = () => {
  const randomHash = uuid.v4()
  const date = new Date().toISOString()

  console.log(`${date}: ${randomHash}`)

  setTimeout(generateHash, 5000)
}

generateHash()
