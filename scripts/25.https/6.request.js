/*
https.request 是 Node.js 中用于发起 HTTPS 请求的方法。

它用于向 HTTPS 服务器发送请求，并接收响应。
*/

const https = require('https')

// 请求选项
const options = {
  hostname: 'example.com',
  port: 443, // 默认端口，通常不需要指定
  path: '/path',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

// 发起请求
const req = https.request(options, (res) => {
  let data = ''

  // 接收数据
  res.on('data', (chunk) => {
    data += chunk
  })

  // 请求结束
  res.on('end', () => {
    console.log('Response:', data)
  })
})

// 处理请求错误
req.on('error', (e) => {
  console.error('Request error:', e)
})

// 发送请求
req.end()
