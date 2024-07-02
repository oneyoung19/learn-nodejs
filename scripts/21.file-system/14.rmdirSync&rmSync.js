/*
1.rmdirSync 不推荐使用
删除目录

2.rmSync
删除文件或目录
*/

const path = require('node:path')
const fs = require('node:fs')

const dirPath = path.resolve(__dirname, '../../src/pages')

// 删除目录的话 需要声明recursive参数 否则报错ENOTEMPTY 另外控制台会有警告，主要大意就是 `recursive` param is deprecated，推荐使用fs.rmSync结合recursive参数进行使用
fs.rmdirSync(dirPath, {
  recursive: true
})

// 删除目录的话 需要声明recursive参数 否则报错EISDIR
// fs.rmSync(dirPath, {
//   recursive: true
// })
