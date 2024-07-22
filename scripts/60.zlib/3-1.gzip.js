const path = require('path')
const fs = require('fs')
const zlib = require('zlib')

// 压缩文件
const input = fs.createReadStream(path.resolve(__dirname, './temp/input.txt'))
const output = fs.createWriteStream(path.resolve(__dirname, './temp/input.txt.gz'))

input.pipe(zlib.createGzip()).pipe(output)
