const net = require('net')

const server = net.createServer((socket) => {
  console.log('客户端已连接')
  socket.write('欢迎来到服务器!\n')

  socket.on('data', (data) => {
    console.log('接收到数据:', data.toString())
  })

  socket.on('end', () => {
    console.log('客户端已断开连接')
  })
})

server.listen(8080, () => {
  console.log('服务器正在监听端口 8080')
})
