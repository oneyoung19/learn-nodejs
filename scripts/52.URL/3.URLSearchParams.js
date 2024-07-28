// URLSearchParams 对象提供了处理查询字符串的便捷方法
const { URL } = require('node:url')
const myURL = new URL('https://example.com:8080/path/name?query=string#hash')
const params = new URLSearchParams(myURL.search)

console.log(params)
params.append('foo', 'bar')
console.log(params.toString()) // 'query=string&foo=bar'

params.set('query', 'newstring')
console.log(params.toString()) // 'query=newstring&foo=bar'

params.delete('foo')
console.log(params.toString()) // 'query=newstring'

console.log(params.get('query')) // 'newstring'
console.log(params.has('query')) // true
console.log(params.has('foo'))   // false
