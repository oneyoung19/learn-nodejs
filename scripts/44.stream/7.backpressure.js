/*
在 Node.js 的流（stream）处理中，数据积压（backpressure）是一个重要的概念。

数据积压是指当一个可写流（writable stream）的速度比可读流（readable stream）慢时，可写流无法及时处理从可读流传输过来的数据，导致数据在可读流中积压。
*/

const fs = require('fs')

// 创建可读流
const readableStream = fs.createReadStream('source.txt')

// 创建可写流
const writableStream = fs.createWriteStream('destination.txt')

// 处理数据积压
readableStream.on('data', (chunk) => {
  // 写入数据到可写流
  const canWrite = writableStream.write(chunk)

  // 如果返回 false，表示数据积压，暂停可读流
  if (!canWrite) {
    console.log('Backpressure detected: Pausing readable stream')
    readableStream.pause()
  }
})

// 当可写流缓冲区被清空时，恢复可读流
writableStream.on('drain', () => {
  console.log('Drain event: Resuming readable stream')
  readableStream.resume()
})

// 处理可读流结束事件
readableStream.on('end', () => {
  console.log('Readable stream ended')
  writableStream.end()
})

// 处理错误
readableStream.on('error', (err) => {
  console.error('Readable stream error:', err)
})

writableStream.on('error', (err) => {
  console.error('Writable stream error:', err)
})

writableStream.on('finish', () => {
  console.log('Writable stream finished')
})
