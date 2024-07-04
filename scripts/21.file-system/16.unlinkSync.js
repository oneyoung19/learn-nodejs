/*
fs.unlinkSync(path)

unlinkSync 用于删除指定路径的文件或符号链接。

删除文件：unlinkSync 用于从文件系统中删除指定路径的文件。
删除符号链接：如果指定路径是一个符号链接，那么 unlinkSync 会删除该符号链接，而不会删除它指向的目标文件。

*/
const path = require('node:path')
const fs = require('node:fs')

const result = fs.unlinkSync(path.resolve(__dirname, './1.promise&callback&sync.js'))

console.log(result)
