const http = require('node:http')

// req => IncomingMessage
// res => ServerResponse => OutgoingMessage
const server = http.createServer((req, res) => {
  console.log(req)
  console.log(res)
  res.statusCode = 404
  res.end(String(404))
})

server.listen(3300)
