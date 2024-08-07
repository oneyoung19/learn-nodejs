/*
http.maxHeaderSize 是用于获取 HTTP 头部的大小限制。

安全性: 适当的头部大小限制有助于保护服务器免受头部攻击（例如，过大的头部数据）。

性能: 设置合理的头部大小限制可以帮助平衡性能和资源使用，避免服务器因处理过大的头部数据而变得缓慢或不稳定。

应用需求: 根据应用的需求和预期的请求头部大小，调整 maxHeaderSize 的值。对于大多数应用程序，默认值已经足够。

*/

const http = require('node:http')

console.log(http.maxHeaderSize / 1024) // kb
