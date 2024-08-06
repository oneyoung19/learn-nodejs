/*
http.Server

主要方法和属性

1. server.listen(port[, hostname][, backlog][, callback]): 使服务器开始监听指定的端口和主机名。callback 是一个可选的回调函数，当服务器开始监听时触发。

2. server.close([callback]): 关闭服务器，停止接收新的连接。callback 是一个可选的回调函数，当服务器完全关闭时触发。

3. server.on(event, listener): 为服务器注册事件监听器。常见的事件包括：
  - 'request'：每当有请求时触发。
  - 'connection'：每当有新的 TCP 连接时触发。
  - 'close'：服务器关闭时触发。

*/

const http = require('http')

// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  
  // 设置响应内容
  res.end('Hello, World!\n')
})

// 监听端口 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/')
})
