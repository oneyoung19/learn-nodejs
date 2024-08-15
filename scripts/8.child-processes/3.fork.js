/*
child_process.fork(modulePath[, args][, options])

child_process.fork 是 Node.js 中用于创建子进程的一种特殊方法，它与 spawn 类似，但专门用于生成新的 Node.js 进程。

fork 创建的子进程会默认启用 IPC（进程间通信）通道，便于父进程和子进程之间传递消息。

*/
const { fork } = require('child_process')
const path = require('node:path')

// 创建子进程
const child = fork(path.resolve(__dirname, './3.fork_child.js'))

// 监听来自子进程的消息
child.on('message', (message) => {
  console.log(`Received message from child: ${message}`)
})

// 向子进程发送消息
child.send('Hello from parent!')

child.on('exit', (code, signal) => {
  console.log(`Child process exited with code ${code} and signal ${signal}`)
})

