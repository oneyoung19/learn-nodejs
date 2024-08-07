/*
http.validateHeaderValue 是 Node.js 中的一个内部方法，用于验证 HTTP 头部字段的值是否符合 HTTP/1.1 规范。

和 http.validateHeaderName 类似，这个方法主要用于确保设置的 HTTP 头部字段值是合法的。

详细解释
参数:

1. name: 一个字符串，表示 HTTP 头部字段的名称。
2. value: 一个字符串，表示 HTTP 头部字段的值。

行为:

1. 如果 value 是合法的 HTTP 头部字段值，这个函数不会返回任何内容。
2. 如果 value 不合法，它将抛出一个 TypeError，指出无效的头部值。

合法的 HTTP 头部字段值

根据 HTTP/1.1 规范，头部字段值必须符合以下规则：

  - 只能包含 ASCII 字符。
  - 不允许包含控制字符（除了 HTAB 和空格）。
  - 必须是字符串类型，通常不应为空字符串。

*/

const http = require('http');

console.log(http.validateHeaderValue('Content-Type', 'text/html'))

// console.log(http.validateHeaderValue('Content-Type'))

console.log(http.validateHeaderValue('Content-Type', 'text/html\n'))

