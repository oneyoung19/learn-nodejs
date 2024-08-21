/*
CLS 全称为 Continuation-local storage，即持久化本地存储。

如下例中的同一个全局session，如果/a和/b两次请求存在时间差，那么第二次请求的 session 值会覆盖第一次请求的 session 值。

但实际上，我们想要/a请求中获取到的是/a，而/b请求中获取到的是/b。

请求 a 和 b 对应的 executionAsyncId 是不相同的。每个请求的 executionAsyncId 都是唯一的，原因如下：

1. 异步上下文独立性
每个 HTTP 请求在 Node.js 中都会被处理为一个独立的异步操作。当请求 a 和 b 到达时，Node.js 会为每个请求创建一个新的异步上下文。
executionAsyncId 是用于标识这些异步上下文的唯一 ID，因此每个请求的异步上下文都会有一个独立的 executionAsyncId。
2. 事件驱动模型
Node.js 依赖事件循环来处理 I/O 操作，包括 HTTP 请求。每当一个新的 HTTP 请求到达时，事件循环会将其放入队列并处理。在处理每个请求时，Node.js 会创建一个新的异步操作，赋予其一个新的 executionAsyncId。
由于 a 和 b 是两个独立的 HTTP 请求，它们在事件循环中是两个独立的事件。因此，Node.js 为每个事件分配不同的 executionAsyncId。
3. 异步资源的唯一标识
executionAsyncId 主要用于跟踪和区分不同的异步操作。在 HTTP 服务器的上下文中，每个客户端请求（如 a 和 b）都是一个独立的异步操作，并且每个操作有自己的资源（如套接字、回调函数）。
为了确保这些异步操作在跟踪和调试时可以被正确识别和区分，Node.js 使用 executionAsyncId 作为它们的唯一标识。
*/

const http = require('node:http')
const asyncHooks = require('node:async_hooks')
const session = new Map()

const server = http.createServer(async (req, res) => {
  console.log(req.url, asyncHooks.executionAsyncId())
  const { url } = req
  session.set('url', url)
  if (url === '/a') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
    res.end(session.get('url'))
    return
  }
  res.end(session.get('url'))
})

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
