const process = require('node:process')

// 当 Node.js 清空了事件循环并且没有额外的工作安排时触发。这个事件可以让开发者在进程退出前执行一些异步操作。如果在此事件处理程序中调度了异步操作，Node.js 进程可能不会退出。
process.on('beforeExit', (e) => {
  console.log('beforeExit', e)
})

// 当进程即将退出时触发。触发时，所有的事件循环、异步操作都已经停止，无法再调度新的操作。开发者可以在此事件中执行最后的同步清理操作，如关闭文件流等。
process.on('exit', (e) => {
  console.log('exit', e)
})

// 当一个异常未被捕获时触发。如果不处理这个事件，进程会在触发该事件后立即退出。
process.on('uncaughtException', (e) => {
  console.log('uncaughtException', e)
})

// 当一个 Promise 被拒绝（rejected）且没有提供 catch 处理程序时触发。该事件可以用来捕获未处理的 Promise 错误。
process.on('unhandledRejection', (e) => {
  console.log('unhandledRejection', e)
})

// 当一个 Promise 被拒绝但稍后有 catch 处理程序时触发。此事件通常在 Promise 被拒绝后的一轮事件循环中触发。
process.on('rejectionHandled', (e) => {
  console.log('rejectionHandled', e)
})

// 当 Node.js 发出警告时触发。可以用来捕获和处理 Node.js 发出的警告信息。
process.on('warning', (e) => {
  console.log('warning', e)
})

// 在使用 child_process 模块时，当子进程发送消息到父进程时触发。在主进程中可以监听这个事件来处理来自子进程的消息。
process.on('message', (e) => {
  console.log('message', e)
})

// 当worker被创建时触发。
process.on('worker', (e) => {
  console.log('worker', e)
})

console.log('This message is displayed first.')
