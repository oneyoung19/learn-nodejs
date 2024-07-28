const url = require('url')

// 解析 URL
const parsedUrl = url.parse('https://example.com:8080/path/name?query=string#hash')
console.log(parsedUrl)

// 格式化 URL 对象为字符串
const formattedUrl = url.format(parsedUrl)
console.log(formattedUrl)
