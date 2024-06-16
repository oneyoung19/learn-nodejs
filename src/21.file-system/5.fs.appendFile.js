/*
fs.appendFileSync(path, data[,options])
向目标文件中追加文本内容 
如果目标文件不存在的话 会自动创建
*/
const path = require('node:path')
const fs = require('node:fs')

const result = fs.appendFileSync(path.resolve(__dirname, './test.txt'), 'Hello World\n')
console.log(result)
