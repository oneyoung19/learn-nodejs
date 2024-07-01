// fs.mkdirSync 创建目录

const path = require('node:path')
const fs = require('node:fs')

// 如果目录已存在的话 会报错。所以可以使用fs.existsSync方法提前判断
fs.mkdirSync(path.resolve(__dirname, '../1.assertion-testing'))
