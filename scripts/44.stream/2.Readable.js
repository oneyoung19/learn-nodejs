/*
Readable：用来读取数据，比如 fs.createReadStream()
*/
// const stream = require('node:stream')

// const { Readable } = stream

// console.log(Readable)


const path = require('node:path')
const fs = require('node:fs')
const filePath = path.resolve(__dirname, './sample.txt')

fs.createReadStream(filePath).pipe(process.stdout)

// const onEnd = function() {
// 	process.stdout.write(']')	
// }
// const fileStream = fs.createReadStream(filePath)
// fileStream.on('end', onEnd)
// fileStream.pipe(process.stdout)
// process.stdout.write('文件读取完成，文件内容是[')

// 文件读取完成，文件内容是[HelloWorld]

