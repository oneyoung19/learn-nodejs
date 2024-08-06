/*
http.Agent 是 Node.js 中 HTTP 客户端使用的一个类，用于管理和复用网络连接。

它主要用于控制 HTTP 请求的行为，比如连接的复用、最大并发连接数等。

默认情况下，Node.js 的 HTTP 请求会自动使用 http.Agent。

不过，也可以通过自定义 http.Agent 实现更复杂的需求。



*/

const http = require('http')

// 创建自定义 Agent
const agent = new http.Agent({
  keepAlive: true,         // 保持连接
  maxSockets: 10,          // 最大并发连接数
  maxFreeSockets: 5,       // 最大空闲连接数
  timeout: 60000           // 超时时间
})

// 使用自定义 Agent 发起请求
const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET',
  agent: agent
}

const req = http.request(options, (res) => {
  // 处理响应
  console.log(`状态码: ${res.statusCode}`)
  
  // 监听数据事件
  res.on('data', (chunk) => {
    console.log(`响应体: ${chunk}`)
  })

  // 监听结束事件
  res.on('end', () => {
    console.log('响应结束')
  })
})

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`)
})

// req.end() 标志着你已经发送完所有的请求数据。在调用 req.end() 后，请求会发送出去
req.end()
