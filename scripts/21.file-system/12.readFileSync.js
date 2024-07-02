/*
fs.readFileSync(path[,options])
options中包括：
- encoding 编码方式 默认为null
- flag 文件系统标志 默认为'r'

如果指定了 encoding，返回一个字符串，表示文件内容。
如果未指定 encoding，返回一个 Buffer，表示文件的二进制数据。
*/
const path = require('node:path')
const fs = require('node:fs')

const result = fs.readFileSync(path.resolve(__dirname, './11.readdirSync.js'), {
  encoding: 'utf8'
})

console.log(result)
