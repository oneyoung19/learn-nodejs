/*
http.IncomingMessage 是 Node.js 中 HTTP 模块的一个类，表示服务器接收到的 HTTP 请求或客户端收到的 HTTP 响应。

在服务器端，当使用 http.createServer() 创建一个 HTTP 服务器时，每次收到请求时，回调函数的第一个参数就是一个 http.IncomingMessage 对象。它包含了请求的详细信息，比如 HTTP 头、请求方法、URL 等。

在客户端，当你使用 http.request() 或 http.get() 发送一个 HTTP 请求时，http.IncomingMessage 对象会作为回调函数的参数，表示服务器的响应。

主要属性和方法：

1. httpVersion: 一个字符串，表示 HTTP 版本号，例如 '1.1'。

2. headers: 一个对象，包含了请求或响应的头部信息。键是头部名称，值是头部的值。

3. rawHeaders: 一个数组，包含了头部的原始信息，以键值对的形式交替存储。

4. method: 仅适用于服务器端，表示请求的方法，比如 'GET'、'POST' 等。

5. url: 仅适用于服务器端，表示请求的 URL。

6. statusCode: 仅适用于客户端，表示服务器响应的 HTTP 状态码，比如 200、404。

7. statusMessage: 仅适用于客户端，表示与 statusCode 关联的状态消息，例如 OK 对应状态码 200。

8. socket: 一个 net.Socket 对象，表示底层的网络套接字。

9. setEncoding([encoding]): 设置接收到的数据的编码。如果你不设置编码，数据将作为 Buffer 对象传递。

10. on(event, listener): 用于监听事件，常见的事件有：
  - 'data': 每当接收到一块数据时触发。数据将作为一个参数传递给回调函数。
  - 'end': 在接收到数据流结束时触发，表示所有的数据都已经被接收。
  - 'error': 当接收数据时发生错误时触发。
  - 'close': 当消息完全结束并且底层连接已被关闭时触发。

*/

const http = require('http')

// 同时支持get和post请求
const server = http.createServer((req, res) => {
  console.log(`Request method: ${req.method}`)
  console.log(`Request URL: ${req.url}`)
  console.log(`Request headers: ${JSON.stringify(req.headers)}`)

  // 监听请求体
  req.on('data', (chunk) => {
    console.log(`Body chunk: ${chunk}`)
  })

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, world!\n')
  })
})

server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
