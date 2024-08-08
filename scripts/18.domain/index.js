/*
domain 是 Node.js 中用于处理异步代码错误的一种机制。

它可以捕获和处理某个范围内的未捕获异常和其他错误，而无需使用传统的 try-catch 语句。

domain 模块早期被引入来简化错误处理，尤其是在回调嵌套和异步操作较多的代码中。

然而，domain 模块在处理复杂的错误时存在一些不足，因此在 Node.js 4.0.0 版本中它被标记为废弃（deprecated），并建议开发者避免使用该模块，转而使用其他更可靠的错误处理方法，如使用 promises 和 async/await 等。

如今，更推荐使用 try-catch 块、Promise 和 async/await 进行错误处理，或者使用专门的错误处理中间件来处理异步错误。
*/

const domain = require('domain')
const d = domain.create()

d.on('error', (err) => {
  console.error('Caught error!', err)
})

d.run(() => {
  // 在这个 domain 中的错误会被捕获
  setTimeout(() => {
      throw new Error('This will be caught by the domain')
  }, 1000)
})
