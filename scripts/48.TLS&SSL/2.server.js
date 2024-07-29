/*
创建一个TLS服务器
*/
const tls = require('tls')
const fs = require('fs')

const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  // 可选的其他配置项
  // ca: [fs.readFileSync('ca-cert.pem')],
}

const server = tls.createServer(options, (socket) => {
  console.log('Server connected',
              socket.authorized ? 'authorized' : 'unauthorized')
  socket.write('Welcome!\n')
  socket.setEncoding('utf8')
  socket.pipe(socket)
})

server.listen(8000, () => {
  console.log('Server listening on port 8000')
})
