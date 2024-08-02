const net = require('net')

const client = net.createConnection({ port: 8080 }, () => {
  console.log('已连接到服务器')
  client.write('你好，服务器!\n')
})

client.on('data', (data) => {
  console.log('接收到:', data.toString())
  client.end()
})

client.on('end', () => {
  console.log('断开与服务器的连接')
})
