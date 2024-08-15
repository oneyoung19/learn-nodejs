/*
child_process.spawn(command[, args][, options])

child_process.spawn() 是一种用于在 Node.js 应用程序中创建新子进程的函数。它提供了一种轻量级的方式来启动外部命令或程序，并且可以异步处理它们的输入和输出。

*/

const { spawn } = require('child_process')

const ls = spawn('ls', ['-lh', '/users'])

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
})

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`)
})

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`)
})
