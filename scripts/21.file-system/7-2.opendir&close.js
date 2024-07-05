/*
opendirSync 是一个同步函数，用于打开一个目录并返回一个 fs.Dir 对象。这个对象可以用来读取目录中的内容。

当使用 fs.opendirSync 打开一个目录时，会创建一个 fs.Dir 对象，并且底层操作系统资源（例如文件描述符）会被分配给该对象。这些资源是有限的，如果不及时释放，可能会导致资源耗尽或其他潜在的问题。

因此，在使用opendirSync之后，要调用closeSync方法进行关闭。

readdirSync 读取整个目录的内容并返回一个包含目录条目名称的数组。它一次性读取所有条目，适用于简单的场景。
*/
const path = require('node:path')
const fs = require('node:fs')

const dir = fs.opendirSync(path.resolve(__dirname, '../'))

// console.log(dir)
let dirent
while ((dirent = dir.readSync()) !== null) {
  console.log(dirent)
}

// 关闭目录
dir.closeSync()
