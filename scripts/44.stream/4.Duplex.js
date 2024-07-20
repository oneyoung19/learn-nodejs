/*
Duplex

一边读 一边写
*/

const { Duplex } = require('node:stream')

const duplexStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(`Writing: ${chunk.toString()}`)
    this.data.push(chunk)
    callback()
  },
  read(size) {
    if (this.data.length > 0) {
      const chunk = this.data.shift()
      this.push(chunk)
    } else {
      this.push(null) // Signal the end of the stream
    }
  }
})

duplexStream.data = []

// 写入数据
duplexStream.write('Hello, ')
duplexStream.write('world!')
duplexStream.end() // 结束写入

// 读取数据
duplexStream.on('data', (chunk) => {
  console.log(`Reading: ${chunk.toString()}`)
})

duplexStream.on('end', () => {
  console.log('No more data.')
})
