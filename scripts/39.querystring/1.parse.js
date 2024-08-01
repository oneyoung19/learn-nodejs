/*
在 Node.js 中，querystring 是一个用于解析和字符串化 URL 查询字符串的内置模块。

*/
const querystring = require('node:querystring')

const str1 = 'name=JohnDoe&age=30'

const str2 = '?name=JohnDoe&age=30'

const str1Parsed = querystring.parse(str1) // { name: 'JohnDoe', age: '30' }

const str2Parsed = querystring.parse(str2) // { '?name': 'JohnDoe', age: '30' }

console.log(str1Parsed, str2Parsed)
