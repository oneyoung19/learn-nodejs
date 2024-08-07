const http = require('node:http')

// req => IncomingMessage
// res => ServerResponse => OutgoingMessage
const server = http.createServer((req, res) => {
  console.log(req)
  console.log(res)
  res.end('Hello World')
})

server.listen(3000)
