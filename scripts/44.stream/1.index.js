/*
[美团Node.js Stream - 基础篇](https://tech.meituan.com/2016/07/08/stream-basics.html)
[一文搞定 Node.js 流 （Stream）](https://juejin.cn/post/6854573219060400141)
[Nodejs基础：stream模块入门介绍与使用——程序员小卡](https://www.cnblogs.com/chyingp/p/nodejs-learning-stream.html)

在构建较复杂的系统时，通常将其拆解为功能独立的若干部分。这些部分的接口遵循一定的规范，通过某种方式相连，以共同完成较复杂的任务。

譬如，shell通过管道|连接各部分，其输入输出的规范是文本流。

在Node.js中，内置的Stream模块也实现了类似功能，各部分通过.pipe()连接。

1. stream种类分为以下四种：
const Stream = require('stream')

// 可读流
const Readable = Stream.Readable
// 可写流
const Writable = Stream.Writable
// 双工（可读可写流）
const Duplex = Stream.Duplex
// 转换（可读可写流 且支持transform转换）
const Transform = Stream.Transform

2. pipe()

3. zip压缩（本例中实际代码同Transform）

4. stream数据积压

*/

const path = require('node:path')
const fs = require('node:fs')
const stream = require('node:stream')

// console.log(stream)

// `fs.createReadStream`创建一个`Readable`对象以读取`bigFile`的内容，并输出到标准输出
// 如果使用`fs.readFile`则可能由于文件过大而失败
fs.createReadStream(path.resolve(__dirname, './1.index.js')).pipe(process.stdout)
