/*
文件描述符：

fchmod(fd)
fchown(fd)
readSync(fd)

*/

const path = require('node:path')
const fs = require('node:fs')

const fd = fs.openSync(path.resolve(__dirname, './7-2.opendir&close.js'), 'r')

console.log(fd)
