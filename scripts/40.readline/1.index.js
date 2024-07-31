/*
readline 模块是 Node.js 中用于处理命令行输入和输出的核心模块之一。

它允许你创建基于流的接口，用于从可读流（如 process.stdin）读取数据并向可写流（如 process.stdout）写入数据。

*/
const readline = require('readline')

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('Welcome to the interactive program!')
console.log('Type anything to see it echoed back.')
console.log('Type "exit" to quit.')

// 监听 line 事件，处理用户的每一行输入
rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close()
    return
  }
  console.log(`Received: ${input}`)
  rl.prompt()
})

// 监听 close 事件，当接口关闭时触发
rl.on('close', () => {
  console.log('Goodbye!')
  process.exit(0)
})

// 初始化 readline 提示
rl.prompt()
