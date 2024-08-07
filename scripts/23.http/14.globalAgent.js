/*
http.globalAgent 是 Node.js 中的一个全局代理对象，用于处理所有 HTTP 请求的代理设置。

它是 http.Agent 类的一个实例，主要用于管理连接池和连接复用。

作用
1. 连接池: http.globalAgent 管理一个全局的连接池，重用和管理与同一主机的连接，以提高性能。
2. 代理设置: 通过设置代理配置，可以控制 HTTP 请求的行为，如代理服务器的使用等。

主要属性和方法
属性:
1. maxSockets: 该属性指定了全局代理能够同时保持的最大连接数。默认为 10。你可以调整这个值来限制并发连接的数量。
2. maxFreeSockets: 该属性指定了在连接池中保持的最大空闲连接数。默认值通常是 256。
3. keepAlive: 这是一个布尔值，指示是否启用 Keep-Alive 功能（持久连接）。默认为 true。
4. keepAliveMsecs: 指定连接在关闭之前应保持空闲的毫秒数。默认为 1000 毫秒（1 秒）。

方法:
1. addRequest(req, socket): 用于将一个新的请求添加到代理中。
2. destroy(): 销毁所有连接并关闭代理。

*/
const http = require('http')

// 修改全局代理设置
http.globalAgent.maxSockets = 20 // 允许最多 20 个并发连接
http.globalAgent.keepAlive = true // 启用 Keep-Alive 功能
