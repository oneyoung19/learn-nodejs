const { URL, URLSearchParams } = require('url')

const myURL = new URL('https://example.com:8080/path/name?query=string#hash')
/*
URL {
  href: 'https://example.com:8080/path/name?query=string#hash',
  origin: 'https://example.com:8080',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'example.com:8080',
  hostname: 'example.com',
  port: '8080',
  pathname: '/path/name',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}
*/
console.log(myURL)

// 可以直接修改 URL 对象的属性：
myURL.pathname = '/new/path'
myURL.search = '?new=query'
console.log(myURL.href)  // 'https://example.com:8080/new/path?new=query#hash'

// 相对url
const base = new URL('https://example.com/path/')
const relative = new URL('subpath', base)
console.log(relative.href) // 'https://example.com/path/subpath'

// 序列化 URL 对象为字符串
const serializedURL = myURL.toString()
console.log(serializedURL)

// 反序列化字符串为 URL 对象
const parsedURL = new URL(serializedURL)
console.log(parsedURL.hostname)

