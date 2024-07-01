// fs.readdirSync(path[,options]) 读取目标目录，并列出目标目录下的目录和文件

// options: { encoding: 'utf8', withFileTypes: false, recursive: false }
// 如果recursive设置为false 那么则会递归读取目录所有文件、子文件以及目录

const path = require('node:path')
const fs = require('node:fs')

const result = fs.readdirSync(path.resolve(__dirname, '../../assets'), {
  // encoding: 'utf8',
  recursive: true // node较高版本，才可能生效，譬如v20.9.0
})

console.log(result)
