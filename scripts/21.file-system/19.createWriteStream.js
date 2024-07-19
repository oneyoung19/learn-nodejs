/*
[fs.createWriteStream创建可写流](https://juejin.cn/post/6844903635038502926)

写入流 可以想象成 水流通过水管向水池中进行注入的过程，而对于水管，我们会称作“缓存区”，水池则是“目标文件”。

当每次写入完成，也就是水管中的水注入完了之后，都会触发 `drain` 方法。
*/

const path = require('node:path')
const fs = require('node:fs')

const filePath = path.resolve(__dirname, './writeStream.txt')

const stream = fs.createWriteStream(filePath, {
  flags: 'w',
  encoding: 'utf8',
  start: 0,
  highWaterMark: 3
})

let i = 9
// 写入9876543210
function write() {
  let flag = true
  while (flag && i >= 0) {
    flag = stream.write(i-- + '')
    console.log(flag)
  }
}

//缓存区充满并被写入完成，处于清空状态时触发
stream.on('drain',() => {
  console.log('drain')
  //当缓存区清空后我们在继续写
  write()
})

write() //第一次调用write方法
