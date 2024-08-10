/*
https://nodejs.org/docs/latest/api/buffer.html

在 Node.js 中，Buffer 是一个用于处理二进制数据的类。

由于 JavaScript 的原生类型只能处理字符串（基于 UTF-16），Buffer 类应运而生，用于在处理文件、网络通信、加密等场景中高效地操作二进制数据。

  - 定长且不可变: 一旦创建，Buffer 的长度是固定的，不能动态调整。
  - 高效的二进制数据操作: Buffer 提供了一系列方法，能够高效地读写二进制数据。
  - 多种编码支持: 可以将数据编码为多种不同的格式，如 UTF-8、Base64、Hex 等。

*/

const buf1 = Buffer.from('Hello')
const buf2 = Buffer.from('World')
const buf3 = Buffer.concat([buf1, buf2])
console.log(buf3.toString()) // 输出 "HelloWorld"
