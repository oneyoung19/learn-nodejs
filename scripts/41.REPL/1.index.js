/*
https://juejin.cn/post/7308562434449342527

replServer.defineCommand() 方法用于向 REPL 实例添加新的 . 前缀命令。

通过键入 . 后跟 keyword 来调用此类命令。
*/

const repl = require('node:repl')

const replServer = repl.start({ prompt: '> ' })

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
