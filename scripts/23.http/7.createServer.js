/*
http.createServer 是 Node.js 中的一个方法，用于创建一个 HTTP 服务器。

这个服务器能够监听客户端的 HTTP 请求，并发送响应。

*/
const http = require('http')

const server = http.createServer((req, res) => {
  // req 是 http.IncomingMessage 的实例，表示客户端的请求
  // res 是 http.ServerResponse 的实例，用于向客户端发送响应

  res.statusCode = 200 // 设置响应状态码
  res.setHeader('Content-Type', 'text/plain') // 设置响应头
  res.end('Hello, World!\n') // 结束响应并发送内容
})

server.listen(3000, () => {
  console.log('服务器正在监听端口 3000')
})
