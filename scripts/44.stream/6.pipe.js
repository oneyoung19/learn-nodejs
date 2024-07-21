/*

在 Node.js 中，pipe 方法是流（stream）模块中的一个重要方法，用于将一个可读流（readable stream）的输出传递到一个可写流（writable stream）中。

这使得处理数据流变得非常方便，尤其是在需要将数据从一个源传递到另一个目标的情况下，例如从文件读取数据并将其写入到另一个文件，或者在网络连接中传输数据。

*/

const path = require('node:path')
const fs = require('node:fs')

// 创建可读流
const readableStream = fs.createReadStream(path.resolve(__dirname, 'sample.txt'))

// 创建可写流
const writableStream = fs.createWriteStream(path.resolve(__dirname, 'destination.txt'))

// 使用 pipe 方法将可读流的数据传递到可写流
readableStream.pipe(writableStream)

// 监听完成事件
writableStream.on('finish', () => {
  console.log('Data has been piped and written to destination.txt')
})

