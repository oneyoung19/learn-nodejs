/*
Deprecated

https://nodejs.org/docs/latest/api/punycode.html


Punycode 是一种特殊的编码方式，用于将 Unicode 字符串转换为 ASCII 字符串，主要应用于国际化域名 (IDN, Internationalized Domain Name) 的表示。

由于传统的 DNS 系统只支持 ASCII 字符，所以 Punycode 提供了一种方式，将包含非 ASCII 字符的域名转化为 DNS 可以识别的形式。

不过在 Node.js v7.0.0 及以后，这个模块已经被弃用，转而建议使用 url 模块中的 URL 类来处理 IDN。
*/

// const punycode = require('punycode')

// // 编码
// const ascii = punycode.encode('你好')
// console.log(ascii) // 输出类似于 'w658h'

//  // 解码
// const unicode = punycode.decode('w658h')
// console.log(unicode) // 输出 '你好'

const { URL } = require('node:url')

// 编码
const myURL = new URL('https://你好.example')
console.log(myURL.hostname) // 输出 'xn--6qq79v.example'

// 解码
// const decoded = new URL('https://xn--6qq79v.example')
// console.log(decoded) // 输出 '你好.example'
