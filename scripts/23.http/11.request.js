/*
http.request 是 Node.js 中用于发起 HTTP 请求的一个方法。

适用于需要发送各种 HTTP 方法（如 POST、PUT、DELETE 等）以及需要自定义请求头和其他参数的场景。

之所以使用res.on('data')监听：

在 Node.js 中，HTTP 响应是以数据流（stream）的形式传输的。

数据流的传输方式意味着响应内容并不是一次性到达，而是以小块（chunk）的形式逐步传输。

当服务器向客户端发送数据时，这些数据会被拆分成一个个的块，data 事件在每个块到达时触发。

*/

const http = require('http')

// 请求数据
const postData = JSON.stringify({
  'msg': 'Hello World'
})

// 请求选项
const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/post',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}

// 发起请求
const req = http.request(options, (res) => {
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

// 监听错误事件
req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`)
})

// 写入请求数据
req.write(postData)

// 结束请求
req.end()
