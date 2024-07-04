const path = require('node:path')
const fs = require('node:fs')

// const targetPath = path.resolve(__dirname, './14.rmdirSync&rmSync.js')
const targetPath = path.resolve(__dirname, '../')

// 获取文件或者目录的信息 包含文件大小 访问时间 内容修改时间 权限更改事件。
const stat = fs.statSync(targetPath)
console.log(stat)

/*
Stats {
  dev: 16777220,
  mode: 16877,
  nlink: 62,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 122242453,
  size: 1984,
  blocks: 0,
  atimeMs: 1718523576164.7617,
  mtimeMs: 1718456959556.3726,
  ctimeMs: 1719632506024.8196,
  birthtimeMs: 1718285449381.608,
  atime: 2024-06-16T07:39:36.165Z,
  mtime: 2024-06-15T13:09:19.556Z,
  ctime: 2024-06-29T03:41:46.025Z,
  birthtime: 2024-06-13T13:30:49.382Z
}
*/

// 获取文件系统信息 包含文件系统的各种属性，如总大小、可用空间、块大小等。无论targetPath设置为什么，同一个系统的执行结果是一样的。
const statfs = fs.statfsSync(targetPath)
console.log(statfs)

/*
StatFs {
  type: 26,
  bsize: 4096,
  blocks: 61202533,
  bfree: 3031215,
  bavail: 3031215,
  files: 129382624,
  ffree: 121248600
}
*/
