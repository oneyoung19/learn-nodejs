const { createServer } = require('node:http')
const { v4:uuidv4 } = require('uuid')
const port = 8000

const server = createServer((req, res) => {
  const uuid = uuidv4()
  const { url } = req
  res.setHeader('uuid', uuid)
  // console.log(req, res)
  if (url === '/test') {
    res.end('Test')
    return
  }
  res.end('Home')
})

server.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
