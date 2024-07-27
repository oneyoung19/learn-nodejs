/*
采用 async 函数（或返回 Promise 的函数）并返回遵循错误优先回调样式的函数，即采用 (err, value) => ... 回调作为最后一个论点。

在回调中，第一个参数将是拒绝原因（如果 Promise 已解决，则为 null ），第二个参数将是已解决的值。
*/
const util = require('node:util')

async function fn() {
  return 'hello world'
}
const callbackFunction = util.callbackify(fn)

callbackFunction((err, ret) => {
  if (err) throw err
  console.log(ret)
})
