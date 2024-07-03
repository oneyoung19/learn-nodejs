const path = require('node:path')
const fs = require('node:fs')

// const targetPath = path.resolve(__dirname, './14.rmdirSync&rmSync.js')
const targetPath = path.resolve(__dirname, '../')

// 获取文件或者目录的信息 包含文件大小 访问时间 内容修改时间 权限更改事件。
const stat = fs.statSync(targetPath)
console.log(stat)

// 获取文件系统信息 包含文件系统的各种属性，如总大小、可用空间、块大小等。无论targetPath设置为什么，同一个系统的执行结果是一样的。
const statfs = fs.statfsSync(targetPath)
console.log(statfs)
