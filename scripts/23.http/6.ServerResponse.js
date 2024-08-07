/*
http.ServerResponse 是 Node.js 中 HTTP 模块的一部分，用于表示服务器向客户端发送的响应。

它提供了各种方法和属性，允许你构建和发送 HTTP 响应，包括设置状态码、响应头、以及发送响应数据。

主要方法和属性
方法
1. res.writeHead(statusCode[, statusMessage][, headers]):

  - 设置响应的状态码、状态消息和响应头。
  - 例如：res.writeHead(200, {'Content-Type': 'text/html'});

2. res.write(chunk[, encoding][, callback]):

  - 发送响应体的一部分数据。可以多次调用这个方法来发送响应体的不同部分。
  - 例如：res.write('<h1>Hello, World!</h1>');

3. res.end([data][, encoding][, callback]):

  - 结束响应。data 是可选的，可以在结束响应时发送最后一块数据。
  - 例如：res.end('Goodbye!');

4. res.setHeader(name, value):

  - 设置单个响应头。
  - 例如：res.setHeader('Content-Type', 'application/json');

5. res.getHeader(name):

  - 获取指定的响应头值。
  - 例如：const contentType = res.getHeader('Content-Type');

6. res.removeHeader(name):

  - 移除指定的响应头。
  - 例如：res.removeHeader('Content-Type');

7. res.writeContinue():

  - 发送 100 Continue 的 HTTP 响应。

8. res.addTrailers(headers):

  - 添加 HTTP trailers，这些是在消息体之后发送的额外头。

属性
1. res.statusCode:

  - 获取或设置响应的状态码。
  - 例如：res.statusCode = 404;

2. res.statusMessage:

  - 获取或设置响应的状态消息。
  - 例如：res.statusMessage = 'Not Found';

3. res.headersSent:

  - 如果响应头已发送，则返回 true。

4. res.finished:

  - 如果响应已结束（res.end() 被调用），则返回 true。
*/
