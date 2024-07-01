// fs.existsSync(path)
// 如果 `path` 路径存在，则返回 `true`，否则为 `false`
// 注意，这里的 `path` 指代的是路径，那么也就是无论是目录还是文件，都是可以的

const fs = require('node:fs')
const path = require('node:path')

const dirResult = fs.existsSync(path.resolve(__dirname, '../1.assertion-testing'))

const fileResult = fs.existsSync(path.resolve(__dirname, './8.copyFile&cp.js'))

console.log(dirResult, fileResult)
