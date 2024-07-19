/*
[fs.createReadStream创建可读流](https://juejin.cn/post/6844903633788600333)

在node中读取文件的方式有来两种，一个是利用fs模块，一个是利用流来读取。

如果读取小文件，我们可以使用fs读取，fs读取文件的时候，是将文件一次性读取到本地内存。而如果读取一个大文件，一次性读取会占用大量内存，效率很低，这个时候需要用流来读取。

流是将数据分割段，一段一段的读取，可以控制速率,效率很高,不会占用太大的内存。

gulp的task任务，文件压缩，和http中的请求和响应等功能的实现都是基于流来实现的。
*/

const path = require('node:path')
const fs = require('node:fs')

const stream = fs.createReadStream(path.resolve(__dirname, './17.writeFileSync.js'), {
  highWaterMark: 64, //文件一次读多少字节,默认 64*1024
  flags: 'r', //默认 'r'
  autoClose: true, //默认读取完毕后自动关闭
  start: 0, //读取文件开始位置
  // end:3, //默认为Infinity
  encoding: 'utf8' //默认为null 此时返回的是Buffer
})

// 打开流
stream.on('open', () => {
  console.log('打开流')
})

// 读取流
stream.on('data', (data) => {
  console.log('data---', data)
})

// 读取错误
stream.on('err',() => {
  console.log('读取错误')
})

//读取结束
stream.on('end',() => {
  console.log('读取结束')
})

//读取关闭
stream.on('close',() => {
  console.log('读取关闭')
})

// 读取暂停
// stream.pause()

// 读取恢复
// stream.resume()
