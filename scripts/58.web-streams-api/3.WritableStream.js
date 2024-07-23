const { WritableStream } = require('node:stream/web')

const writableStream = new WritableStream({
  write(chunk) {
    console.log(`写入的数据: ${chunk}`)
  },
  close() {
    console.log('流关闭')
  }
})

const writer = writableStream.getWriter()

writer.write('Hello, ').then(() => {
  return writer.write('world!')
}).then(() => {
  writer.close()
})
