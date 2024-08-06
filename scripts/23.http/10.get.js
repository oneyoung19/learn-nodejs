/*
http.get 是 Node.js 提供的一个简化方法，用于发起 HTTP GET 请求。

与 http.request 不同，http.get 专门用于 GET 请求，并且不需要手动调用 req.end()。它会自动完成请求的结束和发送。
*/
const http = require('http')

// 使用 http.get 发起 GET 请求
http.get('http://www.example.com', (res) => {
  console.log(`状态码: ${res.statusCode}`)

  // 监听数据事件
  res.on('data', (chunk) => {
    console.log(`响应体: ${chunk}`)
  })

  // 监听结束事件
  res.on('end', () => {
    console.log('响应结束')
  })
}).on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`)
})
