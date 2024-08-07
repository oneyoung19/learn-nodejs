/*
http.validateHeaderName 是 Node.js 中的一个内部方法，用于验证 HTTP 头部字段的名称是否符合 HTTP/1.1 规范。

如果 name 是合法的 HTTP 头部字段名称，这个函数不会返回任何内容。
如果 name 不合法，它将抛出一个 TypeError，指出无效的头部名称。

**合法的 HTTP 头部字段名称**

根据 HTTP/1.1 规范，头部字段名称必须符合以下规则：

  - 仅包含 ASCII 字符。
  - 只能由字母（a-z，A-Z）、数字（0-9）、连字符（-）和下划线（_）组成。
  - 不允许空格或其他特殊字符。

*/
const http = require('node:http')

console.log(http.validateHeaderName('Content-Type'))

console.log(http.validateHeaderName('Content.Type'))

console.log(http.validateHeaderName('Content&Type'))

console.log(http.validateHeaderName('Content Type'))
