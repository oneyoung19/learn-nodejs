/*
fs.writeFileSync(file, data[,options])

options:
- encoding 默认utf8
- mode 默认0o666
- flag 默认w
- flush 

1. 如果该操作，作用于目录，报错illegal operation on a directory
2. 如果该操作指定的目标不存在，则会自动创建
3. 该操作会覆盖文件的原始内容 而不是追加
*/

const path = require('node:path')
const fs = require('node:fs')

const result = fs.writeFileSync(path.resolve(__dirname, './test.txt'), '123\n456')

console.log(result)
