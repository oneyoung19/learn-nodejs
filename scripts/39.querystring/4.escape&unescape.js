/*
querystring.escape()方法以针对 URL 查询字符串的特定要求进行优化的方式对给定的str执行 URL 百分比编码。

querystring.escape()方法由querystring.stringify()使用，一般不希望直接使用。

导出它主要是为了允许应用程序代码在必要时通过将querystring.escape分配给替代函数来提供替换的百分比编码实现。
*/

const querystring = require('node:querystring')

const escaped = querystring.escape('name=John Doe')
console.log(escaped)
// 输出: 'name%3DJohn%20Doe'

const unescaped = querystring.unescape(escaped)
console.log(unescaped)
// 输出: 'name=John Doe'

