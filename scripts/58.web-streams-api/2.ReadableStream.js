const { ReadableStream } = require('node:stream/web')

const readableStream = new ReadableStream({
  start(controller) {
    // 将数据块推送到流中
    controller.enqueue('Hello, ')
    controller.enqueue('world!')
    controller.close()
  }
})

const reader = readableStream.getReader()

reader.read().then(({ done, value }) => {
  if (!done) {
    console.log(value) // 输出: Hello, 
  }
  return reader.read()
}).then(({ done, value }) => {
  if (!done) {
    console.log(value) // 输出: world!
  }
})
