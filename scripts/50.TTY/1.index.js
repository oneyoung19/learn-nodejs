/*
在 Node.js 中，tty 模块提供了用于处理 TTY（Teletypewriter）流的功能。

TTY 流通常与终端相关，用于处理命令行输入和输出。

具体来说，tty 模块主要用于处理标准输入（stdin）、标准输出（stdout）和标准错误输出（stderr）流，这些流在终端环境中是 TTY 流。

tty 模块包含以下几个重要的类和方法：

tty.ReadStream：表示一个 TTY 输入流，例如 process.stdin。
tty.WriteStream：表示一个 TTY 输出流，例如 process.stdout 和 process.stderr。
tty.isatty(fd)：检查给定的文件描述符 fd 是否关联到一个 TTY 设备。
*/
const tty = require('tty')

console.log(process.stdin.fd)
console.log(tty.isatty(process.stdin.fd)) // 检查标准输入是否是 TTY
console.log(tty.isatty(process.stdout.fd)) // 检查标准输出是否是 TTY
console.log(tty.isatty(process.stderr.fd)) // 检查标准错误输出是否是 TTY

const cols = process.stdout.columns
const rows = process.stdout.rows
console.log(`Terminal size: ${cols} columns and ${rows} rows`)
