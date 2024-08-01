/*
在 Node.js 中，querystring 是一个用于解析和字符串化 URL 查询字符串的内置模块。

*/
const querystring = require('node:querystring')

const str1 = 'name=JohnDoe&age=30'

const str2 = '?name=JohnDoe&age=30'

const str3 = 'foo=1&foo=2&foo=3'

const str4 = 'a[b]=1&a[c]=2'

const result1 = querystring.parse(str1) // { name: 'JohnDoe', age: '30' }

console.log(result1)

const result2 = querystring.parse(str2) // { '?name': 'JohnDoe', age: '30' }

console.log(result2)

const result3 = querystring.parse(str3) // { foo: [ '1', '2', '3' ] }

console.log(result3)

const result4 = querystring.parse(str4) // { 'a[b]': '1', 'a[c]': '2' }

console.log(result4)
