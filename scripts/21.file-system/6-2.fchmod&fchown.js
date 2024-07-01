/*
fs.fchmodSync(fd, mode)
fs.fchownSync(fd, uid, gid)

fd全称为file descriptor 即文件描述符
*/

const fs = require('node:fs')

// 使用 chownSync 更改文件路径为 'example.txt' 的文件所有者和群组
fs.chownSync('example.txt', 1000, 1000)

// 打开文件并获取文件描述符
const fd = fs.openSync('example.txt', 'r')

// 使用 fchownSync 更改文件描述符为 fd 的文件所有者和群组
fs.fchownSync(fd, 1000, 1000)

// 关闭文件描述符
fs.closeSync(fd)

