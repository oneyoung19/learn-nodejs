const { TransformStream } = require('node:stream/web')

const transformStream = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase())
  }
})

const readableStream = new ReadableStream({
  start(controller) {
    controller.enqueue('hello, ')
    controller.enqueue('world!')
    controller.close()
  }
})

const writableStream = new WritableStream({
  write(chunk) {
    console.log(`转换后的数据: ${chunk}`)
  }
})

// 将可读流通过转换流传输到可写流
readableStream.pipeThrough(transformStream).pipeTo(writableStream)
