/*
https://nodejs.org/api/async_context.html

{
  AsyncLocalStorage: [class AsyncLocalStorage],
  AsyncResource: [class AsyncResource]
}

AsyncLocalStorage 是 Node.js 中用于管理异步上下文中的存储数据的一个类，属于 async_hooks 模块的一部分。

它允许在多个异步操作之间共享和追踪上下文数据，而不必显式地传递这些数据。

该方法是Node.js对于CLS的原生方法实现。
*/

const http = require('http')
const { AsyncLocalStorage } = require('async_hooks')

const asyncLocalStorage = new AsyncLocalStorage()

const server = http.createServer((req, res) => {
  const requestId = Math.floor(Math.random() * 1000)

  asyncLocalStorage.run(new Map(), () => {
    asyncLocalStorage.getStore().set('requestId', requestId)

    processRequest(req, res)
  })
})

function processRequest(req, res) {
  // Simulate some asynchronous work
  setTimeout(() => {
    const requestId = asyncLocalStorage.getStore().get('requestId')
    res.end(`Handled request with ID: ${requestId}\n`)
    console.log(asyncLocalStorage.getStore())
  }, 100)
}

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})

