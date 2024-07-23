/*
Node.js 从 v16.5.0 版本开始，原生支持 Web Streams API。
这使得开发者可以在 Node.js 中使用与浏览器中相同的流处理接口。
Web Streams API 在 Node.js 中提供了一组标准的、跨平台的流接口，可以简化在不同环境下处理流数据的工作。

它包括三种主要的流：

ReadableStream: 用于从数据源读取数据。
WritableStream: 用于将数据写入目标。
TransformStream: 用于在流中转换数据。
*/
const {
  ReadableStream,
  WritableStream
} = require('node:stream/web')

const readableStream = new ReadableStream({
  start(controller) {
    // 将数据推送到流中
    controller.enqueue('Hello, world!')
    controller.close()
  }
})

const writableStream = new WritableStream({
  write(chunk) {
    console.log(`写入的数据: ${chunk}`)
  }
})

// 管道传输数据
readableStream.pipeTo(writableStream).then(() => {
  console.log('数据传输完成')
})
