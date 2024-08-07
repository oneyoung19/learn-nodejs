/*
https.createServer 是 Node.js 中用于创建 HTTPS 服务器的方法。

options 对象：包含 key 和 cert 属性，这些属性分别是你的私钥和证书文件路径。这些文件通常以 .key 和 .crt 或 .pem 扩展名保存。
*/
const https = require('https')
const fs = require('fs')
const path = require('node:path')

// 读取证书和私钥文件
const options = {
  key: fs.readFileSync(path.resolve(__dirname, './key-cert/key.pem'), 'utf8'),
  cert: fs.readFileSync(path.resolve(__dirname, './key-cert/cert.pem'), 'utf8')
}

// 创建 HTTPS 服务器
const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello, world!\n')
})

// 监听端口
server.listen(443, () => {
  console.log('HTTPS server is running on port 443')
  console.log('https://localhost:443')
})
