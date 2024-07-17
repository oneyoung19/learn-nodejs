/*

`node` 的 `URL API` 包含两部分： 
- The WHATWG URL API：该规范与web浏览器规范一致。（`new URL()` 与 `new URLSearchParams()`）
- The legacy URL API

[WHATWG URL Standard](https://url.spec.whatwg.org/)

*/

const newUrl =
  new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash')

const url = require('node:url')
const legacyUrl =
  url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash')

console.log(newUrl)

console.log(legacyUrl)
