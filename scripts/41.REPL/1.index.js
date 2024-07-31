/*
https://juejin.cn/post/7308562434449342527

在 Node.js 中，REPL 代表 Read-Eval-Print Loop，即“读取-求值-输出循环”。

它是一个交互式编程环境，允许你在命令行中输入 JavaScript 代码，立即执行，并返回结果。

- Read: 读取用户输入的 JavaScript 代码。
- Eval: 评估（执行）这段代码。
- Print: 输出结果。
- Loop: 然后返回到读取下一行代码的状态。

replServer.defineCommand() 方法用于向 REPL 实例添加新的 . 前缀命令。

通过键入 . 后跟 keyword 来调用此类命令。譬如下例中的 `.sayhello` 或者 `.saybye`
*/

const repl = require('node:repl')

const replServer = repl.start({ prompt: '$ ' })

replServer.defineCommand('sayhello', {
  help: 'Say hello',
  action(name) {
    this.clearBufferedCommand()
    console.log(`Hello, ${name}!`)
    this.displayPrompt()
  },
})

replServer.defineCommand('saybye', function saybye() {
  console.log('Goodbye!')
  this.close()
})
