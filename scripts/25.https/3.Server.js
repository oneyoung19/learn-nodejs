/*
https.Server 是 Node.js https 模块中的一个类，用于创建 HTTPS 服务器。

与 http.Server 类似，https.Server 使得你能够监听和处理来自客户端的 HTTP 请求，但它是通过加密的 TLS/SSL 协议进行的，从而确保通信的安全性。

要创建一个 HTTPS 服务器，需要提供 TLS/SSL 证书和密钥，然后使用 https.createServer() 方法来生成一个 https.Server 实例。

*/
const https = require('https')
const fs = require('fs')

// 读取 SSL/TLS 证书和密钥
const options = {
  key: fs.readFileSync('path/to/server-key.pem'),
  cert: fs.readFileSync('path/to/server-cert.pem')
}

// 创建 HTTPS 服务器
const server = https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('Hello, Secure World!')
})

// 监听指定端口
server.listen(443, () => {
  console.log('HTTPS server is running on port 443')
})
