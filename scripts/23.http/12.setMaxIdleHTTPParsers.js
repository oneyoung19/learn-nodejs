/*
http.setMaxIdleHTTPParsers 是 Node.js 中的一个内部方法，用于设置最大空闲 HTTP 解析器的数量。

这个方法在 Node.js 的 HTTP 模块中用于管理连接池中的 HTTP 解析器，以提高性能和资源管理。

在处理 HTTP 请求时，Node.js 使用 HTTP 解析器来解析传入的请求数据。

为了优化性能，Node.js 会维护一个解析器池（parser pool），以便可以重复使用这些解析器，而不是每次都创建新的解析器。

当连接关闭时，解析器可以被释放并返回池中，等待下一个请求。

http.setMaxIdleHTTPParsers 方法允许你设置池中可以保留的空闲解析器的最大数量。

超出这个数量的解析器将被销毁，而不是保留在池中等待下一次使用。

*/
const http = require('http')

// 设置最大空闲 HTTP 解析器数量为 10
http.setMaxIdleHTTPParsers(10)
