/*
在 Node.js 中，dgram 模块提供了用于 UDP 数据报（datagram）通信的实现。

UDP（User Datagram Protocol）是一种无连接的、轻量级的网络协议，用于在互联网上发送和接收数据报。

dgram 模块允许你创建 UDP 套接字并进行以下操作：

1. 发送数据报到指定的主机和端口。
2. 接收数据报并处理它们。
3. 绑定到特定的 IP 地址和端口，以监听传入的数据报。
*/

const dgram = require('node:dgram')
const server = dgram.createSocket('udp4')

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
})

server.on('listening', () => {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(41234)
// Prints: server listening 0.0.0.0:41234
