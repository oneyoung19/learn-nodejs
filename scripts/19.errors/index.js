/*
https://nodejs.org/docs/latest/api/errors.html

在 Node.js 中，所有的错误对象都是 Error 类的实例，通常通过 throw 语句抛出。Error 类具有以下常见属性：

  - message: 错误的描述信息。
  - name: 错误的名称，通常是 Error 或其他子类的名称。
  - stack: 表示错误发生时的调用堆栈，通常用于调试。

Node.js 提供了两种机制来捕获未处理的错误和未捕获的 Promise 拒绝：

  - process.on('uncaughtException', callback): 捕获未捕获的异常。
  - process.on('unhandledRejection', callback): 捕获未处理的 Promise 拒绝。

*/
const fs = require('fs')

fs.readFile('nonexistentfile.txt', (err, data) => {
  if (err) {
    console.error('Error reading file:', err.message)
    return
  }
  console.log(data)
})

const fsPromises = fs.promises

async function readFile() {
  try {
    const data = await fsPromises.readFile('nonexistentfile.txt')
    console.log(data)
  } catch (err) {
    console.error('Error reading file:', err.message)
  }
}

readFile()
