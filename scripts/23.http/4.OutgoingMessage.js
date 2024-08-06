/*
http.OutgoingMessage 是 Node.js 中 HTTP 模块的一个类，它代表可以从 Node.js 应用程序发送到客户端或服务器的 HTTP 响应消息或请求消息。

应用场景

1. 服务器端：当你创建一个 HTTP 服务器并使用 http.createServer() 处理客户端的请求时，响应对象 res 是 http.ServerResponse 类的实例，而 http.ServerResponse 是继承自 http.OutgoingMessage 的。

2. 客户端：当你使用 http.request() 或 http.get() 发送 HTTP 请求时，返回的请求对象（即 http.ClientRequest 实例）也是继承自 http.OutgoingMessage 的。

主要属性和方法

1. chunkedEncoding: 表示是否启用了分块传输编码。当你使用 res.write() 或 req.write() 发送数据时，如果不知道内容的总长度，可以启用分块编码。

2. finished: 表示消息是否已发送完成。

3. headersSent: 表示是否已发送 HTTP 头部。通常在发送消息体数据之前发送头部。

4. setHeader(name, value): 设置 HTTP 头部信息。name 是头部的名称，value 是头部的值。

5. getHeader(name): 获取指定名称的 HTTP 头部值。

6. removeHeader(name): 移除指定名称的 HTTP 头部信息。

7. write(chunk, [encoding], [callback]): 向消息体写入数据块。chunk 是要写入的数据，encoding 是可选的编码方式，callback 是写入完成后的回调函数。

8. end([data], [encoding], [callback]): 表示消息的结束。可以选择在调用 end() 时发送最后一块数据。data 是要发送的数据，encoding 是数据的编码，callback 是可选的回调函数。

9. addTrailers(headers): 在消息末尾添加 HTTP 头部的尾部信息（通常用于分块传输编码）。

*/

const http = require('http')

const server = http.createServer((req, res) => {
  // 设置响应头
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('X-Custom-Header', 'CustomHeaderValue')

  // 写入响应主体数据
  res.write('Hello, ')
  res.write('world!\n')

  // 结束响应并发送剩余数据
  res.end('Goodbye!\n')
})

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
